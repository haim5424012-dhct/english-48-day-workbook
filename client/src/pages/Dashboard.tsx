/**
 * STYLE REMINDER — Editorial Lab Notebook:
 * a field record with ink-blue hierarchy, coral mark-making, ruled paper,
 * stage annotations, and practical evidence—not a generic SaaS dashboard.
 */
import { ArrowUpRight, BarChart3, BookOpen, Check, ChevronRight, Filter, Hash, Layers3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import daysData from "../data/days.json";
import dayIndexData from "../data/days-index.json";
import { assetPath, routePath } from "../lib/routes";

type Day = (typeof daysData.days)[number];
type DayIndex = (typeof dayIndexData)[number];

type DayStat = {
  day: number;
  title: string;
  stage: number;
  stageTitle: string;
  hasGrammar: boolean;
  grammarParagraphs: number;
  grammarLabels: number;
  termGroups: number;
  srsCards: number;
};

const days = daysData.days as Day[];
const dayIndex = dayIndexData as DayIndex[];

function countTags(html: string | undefined, tag: string) {
  if (!html) return 0;
  return (html.match(new RegExp(`<${tag}\\b`, "gi")) || []).length;
}

function makeStats(day: Day): DayStat {
  const index = dayIndex.find((entry) => entry.day === day.day);
  return {
    day: day.day,
    title: day.title,
    stage: index?.stage ?? 0,
    stageTitle: index?.stageTitle ?? "Chưa phân nhóm",
    hasGrammar: Boolean(day.grammarContent?.trim()),
    grammarParagraphs: countTags(day.grammarContent, "p"),
    grammarLabels: countTags(day.grammarContent, "strong"),
    termGroups: countTags(day.grammarContent, "em"),
    srsCards: day.srsCards?.length ?? 0,
  };
}

const stats = days.map(makeStats);
const stageStats = Array.from(new Map(stats.map((item) => [item.stage, item.stageTitle])).entries()).map(([stage, title]) => {
  const items = stats.filter((item) => item.stage === stage);
  return {
    stage,
    title,
    days: items.length,
    grammarDays: items.filter((item) => item.hasGrammar).length,
    paragraphs: items.reduce((sum, item) => sum + item.grammarParagraphs, 0),
    labels: items.reduce((sum, item) => sum + item.grammarLabels, 0),
    terms: items.reduce((sum, item) => sum + item.termGroups, 0),
    srs: items.reduce((sum, item) => sum + item.srsCards, 0),
  };
}).sort((a, b) => a.stage - b.stage);

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function DashboardHeader() {
  return (
    <header className="topbar dashboard-topbar">
      <a className="brand" href={routePath("/")} aria-label="Về lộ trình 48 ngày">
        <span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span>
        <span className="brand-label-badge">48</span>
        <span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span>
      </a>
      <nav className="topnav dashboard-nav" aria-label="Điều hướng chính">
        <a href={routePath("/lo-trinh")}>Lộ trình</a>
        <a href={routePath("/#lesson")}>Bài học</a>
        <a href={routePath("/tong-ket")} className="is-active">Tổng kết</a>
        <a href={routePath("/quiz-lab")}>Phòng quiz</a>
      </nav>
      <div className="topbar-actions"><span className="streak"><Sparkles size={15} /> FIELD RECORD</span></div>
    </header>
  );
}

export default function Dashboard() {
  const [selectedStage, setSelectedStage] = useState("all");
  const [onlyWithGrammar, setOnlyWithGrammar] = useState(false);
  const filteredStats = useMemo(() => stats.filter((item) => {
    const stageMatch = selectedStage === "all" || item.stage === Number(selectedStage);
    return stageMatch && (!onlyWithGrammar || item.hasGrammar);
  }), [selectedStage, onlyWithGrammar]);

  const totals = useMemo(() => ({
    grammarDays: stats.filter((item) => item.hasGrammar).length,
    paragraphs: stats.reduce((sum, item) => sum + item.grammarParagraphs, 0),
    labels: stats.reduce((sum, item) => sum + item.grammarLabels, 0),
    terms: stats.reduce((sum, item) => sum + item.termGroups, 0),
    srs: stats.reduce((sum, item) => sum + item.srsCards, 0),
  }), []);
  const maxTerms = Math.max(...stageStats.map((item) => item.terms), 1);

  return (
    <div className="app-shell dashboard-page">
      <DashboardHeader />
      <main>
        <section className="dashboard-hero"><div className="dashboard-route-mark"><span>48 NGÀY / FIELD RECORD</span><i /><b>01</b><em>02</em><em>03</em><em>04</em><em>05</em><em>06</em></div>
          <div className="dashboard-hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> WORKBOOK FIELD RECORD / 48 DAYS</div>
            <h1>Đã học được<br /><em>bao nhiêu?</em></h1>
            <p>Nhìn lại những gì đã được ghi vào workbook — từ cụm từ được đánh dấu đến từng khối cấu trúc ngữ pháp có nguồn.</p>
            <div className="dashboard-definition"><Hash size={17} /><span><strong>Cách đếm:</strong> “cụm từ” là nhóm <code>&lt;em&gt;</code> trong nội dung nguồn; “cấu trúc” là nhãn <code>&lt;strong&gt;</code>. Đây là chỉ số truy vết, không phải số từ đơn đã chuẩn hóa.</span></div>
          </div>
          <div className="dashboard-hero-note">
            <span className="tiny-label">FIELD NOTE / CONTENT AUDIT</span>
            <strong>{formatNumber(totals.grammarDays)}<small>/48</small></strong>
            <p>ngày đã có nội dung ngữ pháp nguồn</p>
            <div className="dashboard-mini-rule"><span style={{ width: `${(totals.grammarDays / 48) * 100}%` }} /></div>
            <span className="dashboard-note-foot">{Math.round((totals.grammarDays / 48) * 100)}% phủ nội dung</span>
          </div>
        </section>

        <section className="dashboard-summary" aria-label="Tổng quan số liệu">
          <article className="summary-card summary-card-coral"><span className="summary-icon"><BookOpen size={19} /></span><span className="tiny-label">KHO TỪ / SRS</span><strong>{formatNumber(totals.srs)}</strong><p>thẻ ôn từ và cụm từ đã tạo</p></article>
          <article className="summary-card"><span className="summary-icon"><Hash size={19} /></span><span className="tiny-label">TỪ / CỤM TỪ NGUỒN</span><strong>{formatNumber(totals.terms)}</strong><p>nhóm từ/cụm từ đã được đánh dấu</p></article>
          <article className="summary-card"><span className="summary-icon"><Layers3 size={19} /></span><span className="tiny-label">CẤU TRÚC NGỮ PHÁP</span><strong>{formatNumber(totals.labels)}</strong><p>nhãn cấu trúc trong nội dung nguồn</p></article>
          <article className="summary-card summary-card-mint"><span className="summary-icon"><BarChart3 size={19} /></span><span className="tiny-label">ĐOẠN NGỮ PHÁP</span><strong>{formatNumber(totals.paragraphs)}</strong><p>đoạn nội dung ngữ pháp đã ghi</p></article>
        </section>

        <section className="dashboard-section dashboard-stage-section">
          <div className="dashboard-section-heading"><div><span className="section-kicker">LỘ TRÌNH / SỔ CÁI KIẾN THỨC</span><h2>Mật độ học theo<br /><em>từng chặng.</em></h2></div><p>Mỗi cột là một vết mực của dữ liệu đã có nguồn. Chọn một chặng để đọc gần hơn.</p></div>
          <div className="stage-ledger" role="list" aria-label="Thống kê theo giai đoạn">
            {stageStats.map((stage) => <button key={stage.stage} className={`stage-ledger-row ${selectedStage === String(stage.stage) ? "is-selected" : ""}`} onClick={() => setSelectedStage(String(stage.stage))} role="listitem">
              <span className="ledger-stage-number">{String(stage.stage).padStart(2, "0")}</span>
              <span className="ledger-stage-copy"><strong>{stage.title}</strong><small>{stage.grammarDays}/{stage.days} ngày có grammar · {formatNumber(stage.srs)} thẻ SRS</small></span>
              <span className="ledger-bar"><i style={{ width: `${(stage.terms / maxTerms) * 100}%` }} /></span>
              <span className="ledger-value">{formatNumber(stage.terms)}<small>terms</small></span>
              <ChevronRight size={17} />
            </button>)}
          </div>
        </section>

        <section className="dashboard-section dashboard-day-section">
          <div className="dashboard-section-heading day-heading"><div><span className="section-kicker">TỪNG NGÀY / DẤU GHI NGUỒN</span><h2>Đi vào từng<br /><em>ngày học.</em></h2></div><div className="dashboard-filters"><label><Filter size={15} /> <select value={selectedStage} onChange={(event) => setSelectedStage(event.target.value)} aria-label="Lọc theo giai đoạn"><option value="all">Tất cả giai đoạn</option>{stageStats.map((stage) => <option key={stage.stage} value={stage.stage}>Giai đoạn {stage.stage} · {stage.title}</option>)}</select></label><button className={`filter-toggle ${onlyWithGrammar ? "is-on" : ""}`} onClick={() => setOnlyWithGrammar((value) => !value)}><Check size={14} /> Chỉ ngày có grammar</button></div></div>
          <div className="day-ledger" aria-live="polite">
            {filteredStats.map((item) => <a className="day-ledger-row" href={routePath(`/ngay/${String(item.day).padStart(2, "0")}.html`)} key={item.day}>
              <span className="day-ledger-number">{String(item.day).padStart(2, "0")}</span>
              <span className="day-ledger-title"><strong>{item.title}</strong><small>GIAI ĐOẠN {item.stage} · {item.stageTitle}</small></span>
              <span className="day-ledger-metric"><b>{formatNumber(item.termGroups)}</b><small>terms</small></span>
              <span className="day-ledger-metric"><b>{formatNumber(item.grammarLabels)}</b><small>cấu trúc</small></span>
              <span className="day-ledger-metric"><b>{formatNumber(item.srsCards)}</b><small>SRS</small></span>
              <span className={`day-ledger-status ${item.hasGrammar ? "is-ready" : "is-pending"}`}>{item.hasGrammar ? <><Check size={13} /> ĐÃ GHI</> : "SOURCE STATUS"}<ArrowUpRight size={15} /></span>
            </a>)}
            {filteredStats.length === 0 && <div className="dashboard-empty">Không có ngày nào khớp bộ lọc này.</div>}
          </div>
        </section>

        <section className="dashboard-footer-note"><span className="tiny-label">ĐỌC NHỮNG DẤU ĐÃ GHI</span><p>Trang này đọc trực tiếp dữ liệu `days.json`. Khi nguồn mới được xác minh, các con số sẽ thay đổi theo nội dung thật; các ví dụ trong QuizLab không được dùng làm số liệu tổng kết.</p><a className="secondary-action" href={routePath("/lo-trinh")}>Quay về lộ trình <ChevronRight size={15} /></a></section>
      </main>
    </div>
  );
}
