/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * review is a quiet study desk: due cards become the active tray,
 * overdue cards rise first, and each rating leaves a truthful paper trail.
 */
import { ArrowLeft, Check, RotateCcw, TimerReset } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import daysData from "../data/days.json";
import { readRoadmapProgress } from "../lib/progress";
import { dueDate, isDue, lateness, rateSRS, readCardStates, todayKey, writeCardStates, type SRSCardState } from "../lib/srs";
import { assetPath, routePath } from "../lib/routes";

type ReviewCard = { day: number; index: number; front: string; back: string; state: SRSCardState; due: string; late: number };

function formatDate(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

function ReviewHeader() {
  return <header className="topbar"><Link className="brand" href={routePath("/")}><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></Link><Link className="secondary-action" href={routePath("/")}>Về lộ trình <ArrowLeft size={15} /></Link></header>;
}

export default function Review() {
  const progress = readRoadmapProgress();
  const completed = daysData.days.filter((day) => progress.completedDays.includes(day.day));
  const [revision, setRevision] = useState(0);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState("");
  const today = todayKey();
  const allCards = useMemo<ReviewCard[]>(() => completed.flatMap((day) => {
    const cards = day.srsCards ?? [];
    const states = readCardStates(day.day, cards.length);
    return cards.map((card, index) => {
      const base = states[index];
      const state = base.lastReviewedAt ? base : { ...base, lastReviewedAt: progress.lastCompletedAt };
      const due = dueDate(state, today);
      return { day: day.day, index, front: card.front, back: card.back, state, due, late: lateness(state, today) };
    });
  }), [completed, progress.lastCompletedAt, today, revision]);
  const dueCards = allCards.filter((card) => isDue(card.state, today)).sort((a, b) => b.late - a.late);
  const nextDue = allCards.filter((card) => !isDue(card.state, today)).sort((a, b) => a.due.localeCompare(b.due))[0];

  function rate(card: ReviewCard, remembered: boolean) {
    const states = readCardStates(card.day, (daysData.days.find((day) => day.day === card.day)?.srsCards ?? []).length);
    states[card.index] = rateSRS(card.state, remembered);
    writeCardStates(card.day, states);
    setFlipped((current) => ({ ...current, [`${card.day}-${card.index}`]: false }));
    setNotice(remembered ? "Đã ghi Nhớ. Khoảng ôn mới đã được tính từ hôm nay." : "Đã ghi Chưa nhớ. Thẻ sẽ quay lại vào hàng đợi sớm.");
    setRevision((value) => value + 1);
  }

  return <div className="app-shell review-page"><ReviewHeader /><main className="review-main"><div className="eyebrow"><span className="eyebrow-dot" /> REVIEW DESK / SRS</div><h1>Ôn lại để<br /><em>nhớ lâu hơn.</em></h1><p className="review-lede">Chỉ những thẻ đã đến hạn mới đi vào khay hôm nay. Thẻ trễ hơn được đặt lên trước để bạn không bỏ quên điểm yếu.</p>
    <div className="review-loop"><span className="is-active">01 input</span><i>→</i><span>02 recall</span><i>→</i><span>03 rate</span><i>→</i><span>04 return</span></div>
    {dueCards.length ? <section className="due-tray"><div className="review-section-head"><div><span className="section-kicker">TODAY'S TRAY / {today}</span><h2>{dueCards.length} thẻ đến hạn</h2></div><span className="due-note">Thẻ trễ nhất lên trước</span></div><div className="review-card-grid">{dueCards.map((card) => { const key = `${card.day}-${card.index}`; const isFlipped = Boolean(flipped[key]); return <article className={`review-card due-card ${isFlipped ? "is-flipped" : ""}`} key={key}><div className="review-card-top"><span>DAY {String(card.day).padStart(2, "0")} · CARD {String(card.index + 1).padStart(2, "0")}</span><span>{card.late ? `${card.late} ngày trễ` : "đến hạn hôm nay"}</span></div><button className="review-card-face" onClick={() => setFlipped((current) => ({ ...current, [key]: !isFlipped }))}>{isFlipped ? <><small>MẶT SAU</small><strong>{card.back}</strong></> : <><small>MẶT TRƯỚC</small><strong>{card.front}</strong></>}<em>Chạm để lật thẻ</em></button><div className="review-card-actions"><button className="remember-action" onClick={() => rate(card, false)}>Chưa nhớ</button><button className="primary-action" onClick={() => rate(card, true)}><Check size={15} /> Nhớ</button></div></article>; })}</div></section> : <section className="review-empty"><div className="empty-tray-icon"><TimerReset size={22} /></div><span className="section-kicker">FLASHCARD TRAY / CLEAR</span><h2>Không có thẻ nào đến hạn hôm nay.</h2>{nextDue ? <p>Hãy quay lại vào <strong>{formatDate(nextDue.due)}</strong>. Hiện còn {allCards.length} thẻ đang chờ trong lịch ôn.</p> : <p>Hoàn thành đủ sáu bước của Ngày 1, rồi quay lại đây để bắt đầu vòng lặp nhớ lâu.</p>}<div className="review-empty-loop"><span>input</span><span>recall</span><span>rate</span><span>return</span></div>{!allCards.length && <Link className="primary-action" href={routePath("/ngay/01.html")}>Học Ngày 1 <ArrowLeft size={16} /></Link>}</section>}
    {notice && <div className="toast-notice roadmap-toast" role="status"><RotateCcw size={15} /> {notice}</div>}
  </main><footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><span className="footer-note">{dueCards.length} thẻ đến hạn · {progress.streak || 0} ngày liên tiếp</span></footer></div>;
}
