from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from ultralytics import YOLO
import base64
import torch
import json
import time
from collections import defaultdict
import uvicorn

app = FastAPI()

# Enable CORS for WebSocket
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8n.pt")

if torch.cuda.is_available():
    model.to("cuda")
    model.model.half()

unique_ids = set()
selected_classes = [0]
conf_threshold = 0.4
CLASS_NAMES = model.names

# 🎨 Color map per class
def get_color(cls_id):
    np.random.seed(cls_id)
    return tuple(int(x) for x in np.random.randint(0,255,3))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    global selected_classes, conf_threshold

    prev_time = time.time()

    try:
        while True:
            start_time = time.time()

            data = await websocket.receive_text()

            # CONFIG
            if data.startswith("CONFIG:"):
                config = json.loads(data.replace("CONFIG:", ""))
                selected_classes = config.get("classes", [0])
                conf_threshold = config.get("conf", 0.4)
                continue

            # Decode
            img_bytes = base64.b64decode(data)
            np_arr = np.frombuffer(img_bytes, np.uint8)
            frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            if frame is None:
                continue

            frame = cv2.resize(frame, (640, 480))

            results = model.track(
                frame,
                persist=True,
                classes=selected_classes,
                conf=conf_threshold,
                imgsz=320
            )

            object_count = 0
            class_counts = defaultdict(int)
            confidences = []

            if results[0].boxes is not None:
                for box in results[0].boxes:
                    if box.id is None:
                        continue

                    conf = float(box.conf[0])
                    if conf < conf_threshold:
                        continue

                    object_count += 1
                    confidences.append(conf)

                    cls_id = int(box.cls[0])
                    label = CLASS_NAMES[cls_id]
                    class_counts[label] += 1

                    track_id = int(box.id.item())
                    unique_ids.add(track_id)

                    x1, y1, x2, y2 = map(int, box.xyxy[0])

                    color = get_color(cls_id)

                    cv2.rectangle(frame, (x1,y1), (x2,y2), color, 2)

                    cv2.putText(frame,
                                f"{label} {conf:.2f}",
                                (x1, y1-10),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.6,
                                color,
                                2)

            # FPS
            current_time = time.time()
            fps = int(1 / (current_time - prev_time))
            prev_time = current_time

            # Avg confidence
            avg_conf = sum(confidences)/len(confidences) if confidences else 0

            # Processing time
            processing_time = int((time.time() - start_time)*1000)

            # Overlay stats
            cv2.putText(frame, f"FPS: {fps}", (20,30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,0), 2)

            cv2.putText(frame, f"Objects: {object_count}", (20,60),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,0), 2)

            cv2.putText(frame, f"Avg Conf: {avg_conf:.2f}", (20,90),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,0), 2)

            # Encode
            _, buffer = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 50])
            encoded = base64.b64encode(buffer).decode("utf-8")

            # SEND EVERYTHING
            await websocket.send_text(json.dumps({
                "image": encoded,
                "fps": fps,
                "count": object_count,
                "unique": len(unique_ids),
                "avg_conf": round(avg_conf, 2),
                "processing_time": processing_time,
                "class_counts": class_counts
            }))

    except WebSocketDisconnect:
        print("Disconnected")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
        log_level="info"
    )