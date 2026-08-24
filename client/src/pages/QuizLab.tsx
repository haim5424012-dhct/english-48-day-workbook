/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * A quiet testing desk for future quiz formats: paper-white canvas,
 * navy ink, coral actions, mint feedback, and source labels over spectacle.
 */
import { ArrowLeft, FlaskConical, Link2 } from "lucide-react";
import { useState } from "react";
import QuizRenderer from "@/components/QuizRenderer";
import type { QuizItem } from "@/lib/quizSchema";
import { assetPath, routePath } from "../lib/routes";

type Result = { score: number; total: number; answered: number };

const specimens: (QuizItem | { question: string; options: string[]; correctIndex: number })[] = [
  {
    question: "They _______ the answer.",
    options: ["knows", "are knowing", "don't know"],
    correctIndex: 2,
    explanation: "Ví dụ theo bài thi online Ngày 11.",
  },
  {
    id: "fill-day-12",
    type: "fill-blank",
    prompt: "Chia động từ trong ngoặc ở thì quá khứ đơn.",
    sentence: "They ___ (bring) a book last week.",
    blanks: [{ acceptedAnswers: ["brought"], answer: "brought" }],
    explanation: "bring → brought theo bảng động từ trong tài liệu Ngày 12.",
  },
  {
    id: "transform-day-13",
    type: "transformation",
    prompt: "Chuyển câu sang thể phủ định.",
    sourceSentence: "My parents sold the old house in 2000.",
    acceptedAnswers: ["My parents didn't sell the old house in 2000."],
    answer: "My parents didn't sell the old house in 2000.",
    explanation: "Dạng biến đổi câu được ghi nhận trong quiz gaps Ngày 6–13.",
  },
  {
    id: "matching-day-3",
    type: "matching",
    prompt: "Nối câu hỏi với câu trả lời phù hợp.",
    leftItems: ["Who is she?", "Who is this?", "What is that?", "Who are these?", "What are they?"],
    rightItems: ["It’s my grandfather.", "They are my children.", "They are my socks.", "She is my cousin.", "It’s a banana."],
    correctMatches: [3, 0, 4, 1, 2],
    explanation: "Mẫu cặp câu được trích từ bài thi Ngày 3.",
  },
  {
    id: "short-day-7",
    type: "short-answer",
    prompt: "Does the child like ice cream?",
    acceptedAnswers: ["Yes, he does."],
    placeholder: "Yes, …",
    explanation: "Dạng trả lời ngắn theo câu hỏi hình ảnh của bài thi Ngày 7.",
  },
];

export default function QuizLab() {
  const [result, setResult] = useState<Result | null>(null);

  return <div className="quiz-lab-page">
    <header className="topbar quiz-lab-topbar">
      <a className="brand" href={routePath("/")} aria-label="Về lịch 48 ngày"><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></a>
      <a className="back-link" href={routePath("/")}><ArrowLeft size={16} /> Về lộ trình</a>
    </header>
    <main className="quiz-lab-main">
      <div className="quiz-lab-intro">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> BƯỚC 06 / KIỂM TRA + ÔN TẬP</div>
          <h1>Mỗi dạng bài<br /><em>có một cách trả lời.</em></h1>
          <p>Luyện cách điền, viết lại, nối cặp và trả lời ngắn theo đúng yêu cầu của đề. Làm xong, bạn biết ngay mình đã đúng ở đâu và cần xem lại chỗ nào.</p>
        </div>
        <aside className="quiz-lab-note"><FlaskConical size={21} /><span><strong>WORKBOOK NOTE / 06</strong><small>Năm format, một nhịp học: đọc kỹ — làm đúng — xem lại.</small></span></aside>
      </div>
      <div className="quiz-lab-meta"><span><Link2 size={14} /> Bước 06 / Kiểm tra</span><span>MCQ · FILL · TRANSFORM · MATCH · SHORT</span></div>
      <div className="quiz-path-strip" aria-label="Lộ trình sáu bước"><span>01<small>Nghe</small></span><i>→</i><span>02<small>Học</small></span><i>→</i><span>03<small>Dictation</small></span><i>→</i><span>04<small>Nói</small></span><i>→</i><span>05<small>Viết</small></span><i>→</i><span className="is-current">06<small>Ôn tập</small></span></div>
      {result && <div className="quiz-lab-result" role="status"><strong>{result.score}/{result.total}</strong><span>câu đúng · đã trả lời {result.answered}/{result.total}</span></div>}
      <QuizRenderer items={specimens} onSubmit={({ score, total, answered }) => setResult({ score, total, answered })} onReset={() => setResult(null)} />
      <p className="quiz-lab-footnote"><span className="eyebrow-dot" /> Ghi chú nguồn: đây là bàn luyện format; nội dung chính thức của từng ngày vẫn được lấy từ tài liệu đã xác minh.</p>
    </main>
  </div>;
}
