/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * review is a quiet index-card desk: fewer controls, clear intervals,
 * and the same paper/ink/coral signature as the roadmap and lesson page.
 */
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import daysData from "../data/days.json";
import { readRoadmapProgress } from "../lib/progress";

export default function Review() {
  const progress = readRoadmapProgress();
  const completed = daysData.days.filter((day) => progress.completedDays.includes(day.day));
  const cards = completed.flatMap((day) => (day.srsCards ?? []).map((card) => ({ ...card, day: day.day })));
  return <div className="app-shell review-page">
    <header className="topbar"><Link className="brand" href="/"><span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></Link><Link className="secondary-action" href="/">Về lộ trình <ArrowLeft size={15} /></Link></header>
    <main className="review-main"><div className="eyebrow"><span className="eyebrow-dot" /> REVIEW DESK</div><h1>Ôn lại để<br /><em>nhớ lâu hơn.</em></h1><p className="review-lede">Các thẻ từ những ngày đã hoàn thành sẽ nằm ở đây. Mỗi lần quay lại là một lần bạn đặt thêm mực lên trang.</p>
      {cards.length ? <div className="review-card-grid">{cards.map((card, index) => <article className="review-card" key={`${card.day}-${index}`}><div className="review-card-top"><span>DAY {String(card.day).padStart(2, "0")}</span><RotateCcw size={15} /></div><strong>{card.front}</strong><p>{card.back}</p><small>Khoảng ôn: lần {index % 3 + 1}</small></article>)}</div> : <div className="review-empty"><RotateCcw size={22} /><h2>Chưa có thẻ cần ôn.</h2><p>Hoàn thành đủ sáu bước của Ngày 1, rồi quay lại đây để bắt đầu vòng lặp nhớ lâu.</p><Link className="primary-action" href="/ngay/01.html">Học Ngày 1 <ArrowLeft size={16} /></Link></div>}
    </main><footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><span className="footer-note">{cards.length} thẻ đang chờ ôn</span></footer>
  </div>;
}
