import { useEffect, useRef, useState, useCallback } from "react";

const CLASS_OPTIONS = [
  { label: "Person", value: 0 }, { label: "Bicycle", value: 1 },
  { label: "Car", value: 2 }, { label: "Motorcycle", value: 3 },
  { label: "Airplane", value: 4 }, { label: "Bus", value: 5 },
  { label: "Train", value: 6 }, { label: "Truck", value: 7 },
  { label: "Boat", value: 8 }, { label: "Traffic Light", value: 9 },
  { label: "Fire Hydrant", value: 10 }, { label: "Stop Sign", value: 11 },
  { label: "Parking Meter", value: 12 }, { label: "Bench", value: 13 },
  { label: "Bird", value: 14 }, { label: "Cat", value: 15 },
  { label: "Dog", value: 16 }, { label: "Horse", value: 17 },
  { label: "Sheep", value: 18 }, { label: "Cow", value: 19 },
  { label: "Elephant", value: 20 }, { label: "Bear", value: 21 },
  { label: "Zebra", value: 22 }, { label: "Giraffe", value: 23 },
  { label: "Backpack", value: 24 }, { label: "Umbrella", value: 25 },
  { label: "Handbag", value: 26 }, { label: "Tie", value: 27 },
  { label: "Suitcase", value: 28 }, { label: "Frisbee", value: 29 },
  { label: "Skis", value: 30 }, { label: "Snowboard", value: 31 },
  { label: "Sports Ball", value: 32 }, { label: "Kite", value: 33 },
  { label: "Baseball Bat", value: 34 }, { label: "Baseball Glove", value: 35 },
  { label: "Skateboard", value: 36 }, { label: "Surfboard", value: 37 },
  { label: "Tennis Racket", value: 38 }, { label: "Bottle", value: 39 },
  { label: "Wine Glass", value: 40 }, { label: "Cup", value: 41 },
  { label: "Fork", value: 42 }, { label: "Knife", value: 43 },
  { label: "Spoon", value: 44 }, { label: "Bowl", value: 45 },
  { label: "Banana", value: 46 }, { label: "Apple", value: 47 },
  { label: "Sandwich", value: 48 }, { label: "Orange", value: 49 },
  { label: "Broccoli", value: 50 }, { label: "Carrot", value: 51 },
  { label: "Hot Dog", value: 52 }, { label: "Pizza", value: 53 },
  { label: "Donut", value: 54 }, { label: "Cake", value: 55 },
  { label: "Chair", value: 56 }, { label: "Couch", value: 57 },
  { label: "Potted Plant", value: 58 }, { label: "Bed", value: 59 },
  { label: "Dining Table", value: 60 }, { label: "Toilet", value: 61 },
  { label: "TV", value: 62 }, { label: "Laptop", value: 63 },
  { label: "Mouse", value: 64 }, { label: "Remote", value: 65 },
  { label: "Keyboard", value: 66 }, { label: "Cell Phone", value: 67 },
  { label: "Microwave", value: 68 }, { label: "Oven", value: 69 },
  { label: "Toaster", value: 70 }, { label: "Sink", value: 71 },
  { label: "Refrigerator", value: 72 }, { label: "Book", value: 73 },
  { label: "Clock", value: 74 }, { label: "Vase", value: 75 },
  { label: "Scissors", value: 76 }, { label: "Teddy Bear", value: 77 },
  { label: "Hair Drier", value: 78 }, { label: "Toothbrush", value: 79 }
];

if (!document.getElementById("glass-styles")) {
  const s = document.createElement("style");
  s.id = "glass-styles";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #0a0a1a; min-height: 100vh; }

:root {
  --glass-bg: rgba(255,255,255,0.06);
  --glass-border: rgba(255,255,255,0.12);
  --glass-hover: rgba(255,255,255,0.10);
  --accent: #6c8dff;
  --accent2: #a78bfa;
  --green: #34d399;
  --red: #f87171;
  --yellow: #fbbf24;
  --text: rgba(255,255,255,0.92);
  --text-muted: rgba(255,255,255,0.45);
  --text-dim: rgba(255,255,255,0.25);
  --font: 'DM Sans', sans-serif;
  --mono: 'DM Mono', monospace;
}

@keyframes orb-drift {
  0%,100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(40px,-30px) scale(1.08); }
  66% { transform: translate(-20px,20px) scale(0.95); }
}
@keyframes orb-drift2 {
  0%,100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(-50px,30px) scale(1.05); }
  66% { transform: translate(30px,-40px) scale(0.97); }
}
@keyframes fade-up {
  from { opacity:0; transform:translateY(18px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes pulse-dot {
  0%,100% { opacity:1; box-shadow:0 0 0 0 currentColor; }
  50%      { opacity:.7; box-shadow:0 0 0 5px transparent; }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}
@keyframes bar-in {
  from { width: 0; }
  to   { width: var(--w); }
}
@keyframes num-pop {
  0%   { transform: scale(.8) translateY(4px); opacity:0; }
  60%  { transform: scale(1.05) translateY(-1px); opacity:1; }
  100% { transform: scale(1) translateY(0); opacity:1; }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes rec-pulse {
  0%,100% { opacity:1; }
  50% { opacity:.3; }
}
@keyframes slide-in-right {
  from { opacity:0; transform:translateX(12px); }
  to   { opacity:1; transform:translateX(0); }
}

.app {
  min-height: 100vh;
  background: #080818;
  font-family: var(--font);
  color: var(--text);
  position: relative;
  overflow-x: hidden;
}

/* animated background orbs */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.orb1 {
  width: 700px; height: 700px;
  top: -180px; left: -180px;
  background: radial-gradient(circle, rgba(108,141,255,0.18) 0%, transparent 70%);
  animation: orb-drift 18s ease-in-out infinite;
}
.orb2 {
  width: 600px; height: 600px;
  bottom: -150px; right: -150px;
  background: radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%);
  animation: orb-drift2 22s ease-in-out infinite;
}
.orb3 {
  width: 400px; height: 400px;
  top: 50%; left: 50%; transform: translate(-50%,-50%);
  background: radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%);
  animation: orb-drift 30s ease-in-out infinite reverse;
}

/* noise grain overlay */
.grain {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  opacity: .025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

.content { position: relative; z-index: 1; padding: 28px 32px; }

/* glass card */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  transition: border-color .2s, background .2s;
}
.glass:hover { border-color: rgba(255,255,255,0.18); }

/* header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  animation: fade-up .5s ease both;
}
.logo-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 30%, rgba(108,141,255,.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo-sub {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: .5px;
  margin-top: 3px;
}

/* status badge */
.badge {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 14px; border-radius: 999px;
  font-size: 12px; font-weight: 500;
  backdrop-filter: blur(10px);
}
.badge-online {
  background: rgba(52,211,153,.12);
  border: 1px solid rgba(52,211,153,.28);
  color: #34d399;
}
.badge-offline {
  background: rgba(248,113,113,.10);
  border: 1px solid rgba(248,113,113,.25);
  color: #f87171;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: currentColor;
  animation: pulse-dot 2s ease infinite;
}

/* stat cards row */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.stat-card {
  padding: 18px 16px;
  border-radius: 16px;
  animation: fade-up .5s ease both;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: -1px; left: -1px; right: -1px;
  height: 2px;
  border-radius: 16px 16px 0 0;
  background: var(--top-color);
  opacity: .7;
}
.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: .4px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.stat-value {
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
  color: var(--text);
}
.stat-value span {
  display: inline-block;
  animation: num-pop .35s cubic-bezier(.34,1.56,.64,1) both;
}
.stat-icon {
  position: absolute;
  bottom: 14px; right: 14px;
  font-size: 22px;
  opacity: .12;
}

/* main layout */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
}

/* video section */
.video-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.video-card {
  flex: 0 0 640px;
}
.video-label {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.video-label-text {
  font-size: 12px; font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: .8px;
}
.video-shell {
  width: 640px; height: 480px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background: #000;
  position: relative;
}
.video-shell video,
.video-shell img {
  width: 640px;
  height: 480px;
  display: block;
  object-fit: cover;
}
.video-overlay-badge {
  position: absolute;
  top: 12px; left: 12px;
  display: flex; align-items: center; gap: 6px;
  padding: 5px 10px; border-radius: 999px;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.1);
  font-size: 11px; font-weight: 500;
  color: rgba(255,255,255,.8);
}
.rec-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #f87171;
  animation: rec-pulse 1s ease-in-out infinite;
}

/* controls row */
.controls-row {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px;
}
.btn-start {
  height: 42px; padding: 0 28px;
  border-radius: 12px; border: none;
  background: linear-gradient(135deg, #6c8dff, #a78bfa);
  color: #fff; font-family: var(--font);
  font-size: 14px; font-weight: 600;
  cursor: pointer; letter-spacing: .2px;
  transition: transform .15s, box-shadow .15s, opacity .15s;
  box-shadow: 0 4px 20px rgba(108,141,255,.35);
}
.btn-start:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(108,141,255,.5);
}
.btn-start:active:not(:disabled) { transform: scale(.97); }
.btn-start:disabled { opacity: .38; cursor: not-allowed; }
.btn-stop {
  height: 42px; padding: 0 28px;
  border-radius: 12px;
  border: 1px solid rgba(248,113,113,.35);
  background: rgba(248,113,113,.08);
  color: #f87171; font-family: var(--font);
  font-size: 14px; font-weight: 600;
  cursor: pointer; letter-spacing: .2px;
  transition: transform .15s, box-shadow .15s, background .15s, opacity .15s;
}
.btn-stop:hover:not(:disabled) {
  background: rgba(248,113,113,.15);
  box-shadow: 0 4px 20px rgba(248,113,113,.25);
  transform: translateY(-1px);
}
.btn-stop:disabled { opacity: .28; cursor: not-allowed; }
.running-tag {
  display: flex; align-items: center; gap: 7px;
  font-size: 13px; font-weight: 500;
  color: var(--green);
  animation: slide-in-right .3s ease;
}
.running-tag-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--green);
  animation: rec-pulse .8s ease-in-out infinite;
}

/* detection breakdown */
.breakdown-card {
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
}
.section-title {
  font-size: 13px; font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
  display: flex; align-items: center; justify-content: space-between;
}
.section-badge {
  font-size: 11px; font-weight: 500;
  color: var(--accent);
  background: rgba(108,141,255,.12);
  border: 1px solid rgba(108,141,255,.22);
  padding: 3px 10px; border-radius: 999px;
}
.bar-row {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px;
}
.bar-label {
  font-size: 12px; font-weight: 400;
  color: var(--text-muted);
  width: 100px; flex-shrink: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.bar-track {
  flex: 1; height: 6px;
  background: rgba(255,255,255,.07);
  border-radius: 999px; overflow: hidden;
}
.bar-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, #6c8dff, #a78bfa);
  transition: width .6s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 8px rgba(108,141,255,.4);
}
.bar-count {
  font-family: var(--mono);
  font-size: 12px; color: var(--text);
  width: 24px; text-align: right; flex-shrink: 0;
}
.empty-msg {
  font-size: 13px; color: var(--text-dim);
  text-align: center; padding: 24px 0;
}

/* right panel */
.right-panel { display: flex; flex-direction: column; gap: 16px; }

/* confidence */
.conf-card { padding: 20px; border-radius: 16px; }
.conf-header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 12px;
}
.conf-title { font-size: 13px; font-weight: 600; }
.conf-value {
  font-family: var(--mono);
  font-size: 20px; font-weight: 500;
  color: var(--accent);
}
input[type=range] {
  -webkit-appearance: none;
  width: 100%; height: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,.1);
  outline: none; cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: linear-gradient(135deg,#6c8dff,#a78bfa);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(108,141,255,.5);
  transition: transform .15s;
}
input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
.conf-marks {
  display: flex; justify-content: space-between;
  margin-top: 6px;
  font-family: var(--mono); font-size: 10px; color: var(--text-dim);
}

/* filter card */
.filter-card { padding: 20px; border-radius: 16px; flex: 1; }
.search-wrap { position: relative; margin-bottom: 12px; }
.search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-dim); font-size: 14px; pointer-events: none;
}
.search-input {
  width: 100%; height: 38px;
  padding: 0 12px 0 34px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  background: rgba(255,255,255,.05);
  color: var(--text);
  font-family: var(--font); font-size: 13px;
  outline: none; transition: border-color .15s;
}
.search-input::placeholder { color: var(--text-dim); }
.search-input:focus { border-color: rgba(108,141,255,.5); }
.quick-btns { display: flex; gap: 8px; margin-bottom: 12px; }
.qbtn {
  flex: 1; height: 32px; border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--text-muted); font-family: var(--font);
  font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all .15s;
}
.qbtn:hover { background: var(--glass-hover); color: var(--text); }
.tags-wrap {
  display: flex; flex-wrap: wrap; gap: 6px;
  max-height: 240px; overflow-y: auto;
  padding-right: 2px; margin-bottom: 14px;
}
.tag {
  padding: 5px 11px; border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(255,255,255,.03);
  color: var(--text-muted);
  font-size: 12px; font-weight: 400;
  cursor: pointer; transition: all .12s; user-select: none;
}
.tag:hover { border-color: rgba(108,141,255,.4); color: var(--text); }
.tag.active {
  background: rgba(108,141,255,.15);
  border-color: rgba(108,141,255,.5);
  color: #a5b8ff;
}
.btn-apply {
  width: 100%; height: 40px;
  border-radius: 10px; border: none;
  background: linear-gradient(135deg,#6c8dff,#a78bfa);
  color: #fff; font-family: var(--font);
  font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .15s;
  box-shadow: 0 4px 16px rgba(108,141,255,.3);
}
.btn-apply:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(108,141,255,.45); }
.btn-apply:active { transform: scale(.98); }

/* sys info */
.info-card { padding: 18px 20px; border-radius: 16px; }
.info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.info-row:last-child { border-bottom: none; }
.info-key { font-size: 12px; color: var(--text-muted); }
.info-val {
  font-family: var(--mono); font-size: 12px; color: var(--text);
}
.info-val.active { color: var(--green); }

/* scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px; }
`;
  document.head.appendChild(s);
}

/* ── Live Clock ── */
function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "rgba(255,255,255,.45)", letterSpacing: 1 }}>
      {pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}
    </span>
  );
}

/* ── Animated stat number ── */
function StatNum({ value }) {
  return <span key={String(value)}>{value}</span>;
}

/* ── Stat Card ── */
const STAT_META = [
  { key: "fps",             label: "FPS",         color: "#6c8dff", icon: "⚡" },
  { key: "count",           label: "Detections",  color: "#a78bfa", icon: "🎯" },
  { key: "unique",          label: "Classes",     color: "#34d399", icon: "🔖" },
  { key: "avg_conf",        label: "Avg Conf",    color: "#fbbf24", icon: "📊" },
  { key: "processing_time", label: "Latency ms",  color: "#f87171", icon: "⏱" },
];

function StatCard({ label, value, color, icon, delay }) {
  return (
    <div className="stat-card glass" style={{ "--top-color": color, animationDelay: `${delay}s` }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value"><StatNum value={value} /></div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
}

/* ─────────────────── APP ─────────────────── */
export default function App() {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const outputRef = useRef(null);
  const socketRef = useRef(null);

  const [running,    setRunning]    = useState(false);
  const [connected,  setConnected]  = useState(false);
  const [selected,   setSelected]   = useState([0]);
  const [confidence, setConfidence] = useState(0.4);
  const [search,     setSearch]     = useState("");
  const [stats, setStats] = useState({
    fps: 0, count: 0, unique: 0, avg_conf: 0, processing_time: 0, class_counts: {}
  });

  /* WebSocket with Retry Logic */
  useEffect(() => {
    let retries = 0;
    const maxRetries = 5;
    let reconnectTimeout;

    const connectWebSocket = () => {
      try {
        const ws = new WebSocket("ws://localhost:8000/ws");
        socketRef.current = ws;
        
        ws.onopen = () => {
          console.log("✅ WebSocket connected");
          setConnected(true);
          retries = 0;
        };
        
        ws.onmessage = (e) => {
          try {
            const r = JSON.parse(e.data);
            if (outputRef.current) outputRef.current.src = `data:image/jpeg;base64,${r.image}`;
            setStats(r);
          } catch (err) {
            console.error("Error parsing message:", err);
          }
        };
        
        ws.onerror = (error) => {
          console.error("❌ WebSocket error:", error);
          setConnected(false);
        };
        
        ws.onclose = () => {
          console.warn("⚠️ WebSocket closed. Reconnecting...");
          setConnected(false);
          
          if (retries < maxRetries) {
            retries++;
            const delay = Math.min(1000 * Math.pow(2, retries - 1), 10000);
            console.log(`Reconnect attempt ${retries}/${maxRetries} in ${delay}ms`);
            reconnectTimeout = setTimeout(connectWebSocket, delay);
          } else {
            console.error("Max retries reached. Backend server may not be running on ws://localhost:8000");
          }
        };
      } catch (err) {
        console.error("Error creating WebSocket:", err);
        setConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  /* Camera */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
      .then(s => { videoRef.current.srcObject = s; })
      .catch(() => {});
  }, []);

  const sendConfig = () =>
    socketRef.current?.send("CONFIG:" + JSON.stringify({ classes: selected, conf: confidence }));

  const sendFrame = useCallback(() => {
    if (!socketRef.current || socketRef.current.readyState !== 1) return;
    const c = canvasRef.current;
    c.getContext("2d").drawImage(videoRef.current, 0, 0, 640, 480);
    c.toBlob(blob => {
      const fr = new FileReader();
      fr.onloadend = () => socketRef.current.send(fr.result.split(",")[1]);
      fr.readAsDataURL(blob);
    }, "image/jpeg", 0.5);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(sendFrame, 120);
    return () => clearInterval(id);
  }, [running, sendFrame]);

  const toggle = v => setSelected(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const filtered = CLASS_OPTIONS.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));
  const counts   = Object.entries(stats.class_counts || {});

  return (
    <div className="app">
      {/* background */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grain" />

      <div className="content">

        {/* ── HEADER ── */}
        <header className="header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* logo icon */}
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg,#6c8dff,#a78bfa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, boxShadow: "0 4px 16px rgba(108,141,255,.4)"
              }}>🧠</div>
              <div>
                <div className="logo-title">object Detect</div>
                <div className="logo-sub">YOLOv8 · Real-Time Object Detection</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Clock />
            <div className={`badge ${connected ? "badge-online" : "badge-offline"}`}>
              <div className="badge-dot" />
              {connected ? "Connected" : "Offline"}
            </div>
          </div>
        </header>

        {/* ── STATS ROW ── */}
        <div className="stats-grid">
          {STAT_META.map((m, i) => (
            <StatCard
              key={m.key}
              label={m.label}
              value={stats[m.key]}
              color={m.color}
              icon={m.icon}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="main-grid">

          {/* LEFT: videos + controls + breakdown */}
          <div>

            {/* Video feeds side by side, both exactly 640×480 */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>

              {/* Raw feed */}
              <div className="video-card">
                <div className="video-label">
                  <span className="video-label-text">Without Detection</span>
                  {running && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#f87171" }}>
                      <div className="rec-dot" /> Live
                    </div>
                  )}
                </div>
                <div className="video-shell" style={{ borderRadius: 14 }}>
                  <video ref={videoRef} autoPlay muted playsInline width="640" height="480" />
                  <div className="video-overlay-badge">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                    640 × 480
                  </div>
                </div>
              </div>

              {/* AI output */}
              <div className="video-card">
                <div className="video-label">
                  <span className="video-label-text">With Detection</span>
                  {running && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#a78bfa" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa", animation: "rec-pulse .8s ease-in-out infinite" }} />
                      AI Active
                    </div>
                  )}
                </div>
                <div className="video-shell" style={{ borderRadius: 14 }}>
                  <img ref={outputRef} alt="Detection output" width="640" height="480"
                    style={{ background: "#111", minHeight: 480, display: "block" }} />
                  <div className="video-overlay-badge">
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
                    640 × 480
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="controls-row">
              <button className="btn-start" onClick={() => setRunning(true)} disabled={running}>
                ▶ &nbsp; Start Detection
              </button>
              <button className="btn-stop" onClick={() => setRunning(false)} disabled={!running}>
                ■ &nbsp; Stop
              </button>
              {running && (
                <div className="running-tag">
                  <div className="running-tag-dot" />
                  Detecting objects…
                </div>
              )}
            </div>

            {/* Class breakdown */}
            <div className="breakdown-card glass">
              <div className="section-title">
                Detection Breakdown
                <span className="section-badge">{counts.length} active</span>
              </div>
              {counts.length === 0
                ? <div className="empty-msg">No detections yet — start the feed to begin</div>
                : counts.map(([k, v]) => (
                    <div className="bar-row" key={k}>
                      <span className="bar-label">{k}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${Math.round((v / (stats.count || 1)) * 100)}%` }} />
                      </div>
                      <span className="bar-count">{v}</span>
                    </div>
                  ))
              }
            </div>
          </div>

          {/* RIGHT: controls panel */}
          <div className="right-panel">

            {/* Confidence */}
            <div className="conf-card glass">
              <div className="conf-header">
                <span className="conf-title">Confidence Threshold</span>
                <span className="conf-value">{Math.round(confidence * 100)}%</span>
              </div>
              <input
                type="range" min=".05" max="1" step=".05"
                value={confidence}
                onChange={e => setConfidence(parseFloat(e.target.value))}
              />
              <div className="conf-marks"><span>5%</span><span>50%</span><span>100%</span></div>
            </div>

            {/* Object filter */}
            <div className="filter-card glass">
              <div className="section-title">
                Class Filter
                <span className="section-badge">{selected.length} / {CLASS_OPTIONS.length}</span>
              </div>

              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search class…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="quick-btns">
                <button className="qbtn" onClick={() => setSelected(CLASS_OPTIONS.map(c => c.value))}>Select All</button>
                <button className="qbtn" onClick={() => setSelected([])}>Clear</button>
              </div>

              <div className="tags-wrap">
                {filtered.map(c => (
                  <div
                    key={c.value}
                    className={`tag${selected.includes(c.value) ? " active" : ""}`}
                    onClick={() => toggle(c.value)}
                  >
                    {c.label}
                  </div>
                ))}
              </div>

              <button className="btn-apply" onClick={sendConfig}>Apply Filter</button>
            </div>

            {/* System info */}
            <div className="info-card glass">
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>System Info</div>
              {[
                ["Model",      "YOLOv8"],
                ["Resolution", "640 × 480"],
                ["Interval",   "120 ms"],
                ["Transport",  "WebSocket"],
                ["Status",     running ? "Running" : "Idle", running],
              ].map(([k, v, highlight]) => (
                <div className="info-row" key={k}>
                  <span className="info-key">{k}</span>
                  <span className={`info-val${highlight ? " active" : ""}`}>{v}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
    </div>
  );
}