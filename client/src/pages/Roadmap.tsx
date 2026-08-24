/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * roadmap is a paper route, not a flat SaaS grid. Use stage labels,
 * inked path lines, task-card metadata, XONG stamps, and clear locked states.
 */
import { ArrowRight, Check, ChevronRight, Flame, Lock, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import indexData from "../data/days-index.json";
import { isDayReady, readRoadmapProgress, type RoadmapProgress } from "../lib/progress";

type DayIndex = (typeof indexData)[number];

type Stage = {
  id: number;
  range: string;
  title: string;
  note: string;
};

const stages: Stage[] = [
  { id: 1, range: "01—04", title: "Nền tảng động từ TO BE", note: "Đặt nền móng cho câu đơn giản." },
  { id: 2, range: "05—11", title: "Động từ thường & thì hiện tại", note: "Đưa hành động vào câu." },
  { id: 3, range: "12—14", title: "Thì quá khứ", note: "Kể lại điều đã xảy ra." },
  { id: 4, range: "15—17", title: "Hiện tại hoàn thành & tương lai", note: "Nối thời gian với ý định." },
  { id: 5, range: "18—20", title: "Ngữ âm — phát âm & trọng âm", note: "Làm rõ âm và nhịp." },
  { id: 6, range: "21—22", title: "Nghe số/tên + động từ khuyết thiếu", note: "Nghe đúng chi tiết cần dùng." },
  { id: 7, range: "23—25", title: "Liên từ", note: "Nối những mảnh ý thành câu." },
  { id: 8, range: "26—28", title: "Câu điều kiện", note: "Nói về khả năng và giả định." },
  { id: 9, range: "29—33", title: "Luyện nghe chuyên đề", note: "Điền từ, chính tả, giờ, ngày và nơi chốn." },
  { id: 10, range: "34—48", title: "Nghe chuyên đề & dự án kết khóa", note: "Từ nghe hiểu đến ghi chú, diễn đạt lại và thuyết trình." },
];

const dayIndex = indexData as DayIndex[];

function statusForDay(day: number, progress: RoadmapProgress) {
  if (progress.completedDays.includes(day)) return "completed" as const;
  if (typeof window !== "undefined") {
    try {
      const saved = window.localStorage.getItem(`english48-day${day}-progress`);
      const parsed = saved ? JSON.parse(saved) as { completed?: boolean[] } : null;
      if (Array.isArray(parsed?.completed) && parsed.completed.some(Boolean)) return "in-progress" as const;
    } catch { /* invalid local progress is treated as untouched */ }
  }
  if (isDayReady(day, progress.completedDays)) return "ready" as const;
  return "locked" as const;
}

function stageProgress(stage: Stage, progress: RoadmapProgress) {
  const days = dayIndex.filter((entry) => entry.stage === stage.id);
  return days.filter((entry) => progress.completedDays.includes(entry.day)).length;
}

function navigatePreview(path: string, setLocation: (path: string) => void) {
  if (window.location.protocol !== "file:") {
    setLocation(path);
    return;
  }
  const pathname = decodeURIComponent(window.location.pathname).replace(/\\\\/g, "/");
  const marker = pathname.search(/\/(ngay|lo-trinh|quiz-lab|on-tap)(?:\/|$)/);
  const root = marker >= 0 ? pathname.slice(0, marker + 1) : pathname.slice(0, pathname.lastIndexOf("/") + 1);
  const route = path === "/" ? "/" : path;
  window.location.href = `${root}index.html?cometRoute=${encodeURIComponent(route)}`;
}

function RoadmapHeader({ progress }: { progress: RoadmapProgress }) {
  const [, setLocation] = useLocation();
  return (
    <header className="topbar roadmap-topbar">
      <button className="brand brand-button" onClick={() => navigatePreview("/", setLocation)} aria-label="Về trang Ngày 1">
        <span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span>
        <span className="brand-label-badge">48</span>
        <span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span>
      </button>
      <nav className="topnav roadmap-nav" aria-label="Điều hướng chính">
        <a href="#roadmap">Lộ trình</a><a href="/#lesson">Bài học</a><a href="/#principles">Phương pháp</a><a href="/tong-ket">Tổng kết</a><a href="/quiz-lab">Phòng quiz</a>
      </nav>
      <div className="topbar-actions">
        <span className="streak"><Sparkles size={15} /> {progress.streak || 0} ngày liên tiếp</span>
        <a className="top-review-link" href="/on-tap">Ôn tập <RotateCcw size={14} /></a>
      </div>
    </header>
  );
}

export default function Roadmap() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState<RoadmapProgress>(() => readRoadmapProgress());
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const sync = () => setProgress(readRoadmapProgress());
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("focus", sync); };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const completedDays = progress.completedDays.length;
  const percent = Math.round((completedDays / 48) * 100);
  const currentDay = useMemo(() => {
    for (let day = 1; day <= 48; day += 1) if (!progress.completedDays.includes(day)) return day;
    return 48;
  }, [progress.completedDays]);
  const currentStage = stages.find((stage) => currentDay >= Number(stage.range.slice(0, 2)) && currentDay <= Number(stage.range.slice(3)))?.id ?? 10;

  function handleDay(entry: DayIndex) {
    const status = statusForDay(entry.day, progress);
    if (status === "locked") {
      setNotice(`Hoàn thành Ngày ${String(entry.day - 1).padStart(2, "0")} để mở trạm này.`);
      return;
    }
    navigatePreview(`/ngay/${String(entry.day).padStart(2, "0")}.html`, setLocation);
  }

  return (
    <div className="app-shell roadmap-page" id="roadmap">
      <RoadmapHeader progress={progress} />
      <main>
        <section className="roadmap-hero">
          <div className="roadmap-hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR 48-DAY ROUTE</div>
            <h1>Mỗi ngày một<br /><em>việc nhỏ.</em> Một<br />đường đi rõ.</h1>
            <p>Không cần tự hỏi hôm nay học gì. Chọn một trạm, làm đủ sáu bước, rồi để dấu XONG dẫn bạn đi tiếp.</p><div className="roadmap-loop" aria-label="Vòng lặp sáu bước"><span className="is-current">01 Input</span><i>→</i><span>02 Grammar</span><i>→</i><span>03 Listen</span><i>→</i><span>04 Speak</span><i>→</i><span>05 Write</span><i>→</i><span>06 Review</span></div>
            <div className="roadmap-actions"><button className="primary-action" onClick={() => { const entry = dayIndex.find((item) => item.day === currentDay); if (entry) handleDay(entry); }}>Tiếp tục Ngày {String(currentDay).padStart(2, "0")} <ArrowRight size={17} /></button><a className="secondary-action" href="/on-tap">Mở kho ôn tập <RotateCcw size={15} /></a></div>
          </div>
          <div className="roadmap-stat-card">
            <div className="roadmap-stat-top"><span className="tiny-label">FIELD NOTE / 48 DAYS</span><Flame size={19} /></div>
            <div className="roadmap-stat-number">{String(completedDays).padStart(2, "0")}<span>/48</span></div>
            <p>ngày đã để lại dấu trên hành trình</p>
            <div className="roadmap-progress-line"><span style={{ width: `${Math.max(percent, 2)}%` }} /></div>
            <div className="roadmap-stat-foot"><strong>{percent}% hoàn thành</strong><span>{progress.streak || 0} ngày liên tiếp</span></div>
          </div>
        </section>

        <section className="roadmap-overview" aria-label="Tổng quan lộ trình"><span className="overview-margin-note">WORKBOOK / FIELD RECORD</span>
          <div><span className="tiny-label">CURRENT POSITION</span><strong>Ngày {String(currentDay).padStart(2, "0")} · Giai đoạn {currentStage}</strong></div>
          <div className="overview-rule" /><div><span className="tiny-label">SEQUENCE</span><span>48 trạm · 10 chặng · 1 thói quen</span></div>
        </section>

        <section className="route-section" id="current-stage">
          <div className="route-intro"><div><div className="section-kicker">THE ROUTE / 10 STAGES</div><h2>Không phải<br /><em>một danh sách.</em></h2></div><p>Mỗi khối là một chặng kiến thức. Mỗi ô là một lần ngồi xuống. Giai đoạn hiện tại luôn có viền coral để bạn biết mình đang ở đâu.</p></div>
          <div className="stage-list">
            {stages.map((stage) => {
              const stageDays = dayIndex.filter((entry) => entry.stage === stage.id);
              const done = stageProgress(stage, progress);
              const active = stage.id === currentStage;
              return <section className={`stage-block ${active ? "is-current" : ""}`} key={stage.id}>
                <div className="stage-marker"><span>{String(stage.id).padStart(2, "0")}</span><i /></div>
                <div className="stage-content">
                  <div className="stage-heading"><div><span className="stage-range">DAYS {stage.range}</span><h3>{stage.title}</h3><p>{stage.note}</p></div><div className="stage-count">{done}<span>/{stageDays.length}</span></div></div>
                  <div className="day-node-grid">{stageDays.map((entry) => {
                    const status = statusForDay(entry.day, progress);
                    return <button key={entry.day} className={`day-node ${status}`} onClick={() => handleDay(entry)} aria-label={`Ngày ${entry.day}: ${entry.title}`}>
                      <span className="node-meta">LESSON / {String(entry.day).padStart(2, "0")}</span>
                      <span className="node-day">{String(entry.day).padStart(2, "0")}</span>
                      <span className="node-title">{entry.title}</span>
                      <span className="node-status">{status === "completed" ? <><Check size={13} /> XONG</> : status === "in-progress" ? "ĐANG HỌC" : status === "ready" ? "ĐANG MỞ" : <><Lock size={12} /> CHƯA MỞ</>}</span>
                      {status === "locked" && <Lock className="node-lock" size={15} />}
                      {status === "completed" && <span className="node-stamp">XONG</span>}
                    </button>;
                  })}</div>
                </div>
              </section>;
            })}
          </div>
        </section>

        <section className="roadmap-review-band"><div><span className="section-kicker">RETURN LATER</span><h2>Ôn lại những gì<br /><em>đã đi qua.</em></h2></div><p>Flashcard của các ngày đã hoàn thành được gom vào một chỗ. Không để công sức hôm qua biến mất khi bạn bước sang ngày mới.</p><a className="primary-action" href="/on-tap">Mở kho ôn tập <ArrowRight size={17} /></a></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><p>Build the habit. Keep the mark.</p><span className="footer-note">{completedDays}/48 ngày đã ghi dấu</span></footer>
      {notice && <div className="toast-notice roadmap-toast" role="status"><Lock size={15} /> {notice}</div>}
    </div>
  );
}
