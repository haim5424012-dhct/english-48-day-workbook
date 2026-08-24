/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * Every exercise is a small field note: numbered, tactile, source-aware,
 * with coral actions, mint confirmation, and no noisy gamification.
 */
import { Check, ChevronDown, CircleAlert, Link2, RotateCcw } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import {
  matchesAcceptedAnswer,
  normalizeQuizItem,
  type QuizItem,
  type MultipleChoiceQuiz,
  type FillBlankQuiz,
  type TransformationQuiz,
  type MatchingQuiz,
  type ShortAnswerQuiz,
} from "@/lib/quizSchema";

export type QuizAnswer = number | string | string[] | number[] | undefined;

type QuizResult = {
  score: number;
  total: number;
  answered: number;
  correct: boolean[];
};

type QuizRendererProps = {
  items: (QuizItem | { question: string; options: string[]; correctIndex: number })[];
  onSubmit?: (result: QuizResult) => void;
  onReset?: () => void;
};

function isAnswered(answer: QuizAnswer) {
  if (Array.isArray(answer)) return answer.length > 0 && answer.every((value) => value !== -1 && String(value).trim() !== "");
  return answer !== undefined && String(answer).trim() !== "";
}

function scoreItem(item: QuizItem, answer: QuizAnswer) {
  if (item.type === "multiple-choice") return answer === item.correctIndex;
  if (item.type === "fill-blank") {
    const values = Array.isArray(answer) ? answer : [];
    return item.blanks.every((blank, index) => matchesAcceptedAnswer(String(values[index] ?? ""), blank.acceptedAnswers));
  }
  if (item.type === "transformation") return matchesAcceptedAnswer(String(answer ?? ""), item.acceptedAnswers);
  if (item.type === "matching") {
    const values = Array.isArray(answer) ? answer : [];
    return item.correctMatches.length === values.length && item.correctMatches.every((match, index) => Number(values[index]) === match);
  }
  return matchesAcceptedAnswer(String(answer ?? ""), item.acceptedAnswers);
}

function answerLabel(item: QuizItem) {
  if (item.type === "multiple-choice") return item.options[item.correctIndex];
  if (item.type === "fill-blank") return item.blanks.map((blank) => blank.answer ?? blank.acceptedAnswers[0]).join(" · ");
  if (item.type === "transformation") return item.answer ?? item.acceptedAnswers[0];
  if (item.type === "matching") return item.correctMatches.map((match) => item.rightItems[match]).join(" · ");
  return item.answer ?? item.acceptedAnswers[0];
}

function MultipleChoice({ item, value, onChange, submitted, correct }: { item: MultipleChoiceQuiz; value?: number; onChange: (value: number) => void; submitted: boolean; correct: boolean }) {
  return <div className="quiz-main">
    <strong>{item.question}</strong>
    <div className="option-row" role="group" aria-label="Các lựa chọn">
      {item.options.map((option, optionIndex) => <button type="button" className={`${value === optionIndex ? "selected" : ""} ${submitted && optionIndex === item.correctIndex ? "answer-key" : ""}`} aria-pressed={value === optionIndex} key={option} onClick={() => onChange(optionIndex)}>{String.fromCharCode(65 + optionIndex)}. {option}</button>)}
    </div>
    {submitted && <Feedback correct={correct} answer={answerLabel(item)} explanation={item.explanation} />}
  </div>;
}

function FillBlank({ item, value, onChange, submitted, correct }: { item: FillBlankQuiz; value?: string[]; onChange: (value: string[]) => void; submitted: boolean; correct: boolean }) {
  const values = value ?? item.blanks.map(() => "");
  const parts = item.sentence.split("___");
  return <div className="quiz-main">
    {item.prompt && <p className="quiz-instruction">{item.prompt}</p>}
    <div className="fill-sentence" aria-label="Câu có chỗ trống">{parts.map((part, index) => <span key={`${part}-${index}`}>{part}{index < item.blanks.length && <input value={values[index] ?? ""} onChange={(event) => { const next = [...values]; next[index] = event.target.value; onChange(next); }} aria-label={`Ô trống ${index + 1}`} placeholder="..." />}</span>)}</div>
    {submitted && <Feedback correct={correct} answer={answerLabel(item)} explanation={item.explanation} />}
  </div>;
}

function Transformation({ item, value, onChange, submitted, correct }: { item: TransformationQuiz; value?: string; onChange: (value: string) => void; submitted: boolean; correct: boolean }) {
  return <div className="quiz-main">
    {item.instruction && <p className="quiz-instruction">{item.instruction}</p>}
    <div className="transformation-source"><span className="tiny-label">CÂU GỐC</span><strong>{item.sourceSentence}</strong></div>
    <textarea className="quiz-textarea" value={value ?? ""} onChange={(event) => onChange(event.target.value)} rows={2} placeholder="Viết lại câu ở đây…" aria-label="Câu trả lời biến đổi" />
    {submitted && <Feedback correct={correct} answer={answerLabel(item)} explanation={item.explanation} />}
  </div>;
}

function Matching({ item, value, onChange, submitted, correct }: { item: MatchingQuiz; value?: number[]; onChange: (value: number[]) => void; submitted: boolean; correct: boolean }) {
  const values = value ?? item.leftItems.map(() => -1);
  return <div className="quiz-main">
    <p className="quiz-instruction">Nối mỗi vế bên trái với đáp án phù hợp bên phải.</p>
    <div className="matching-grid">
      <div className="matching-column"><span className="tiny-label">CỘT A</span>{item.leftItems.map((left, index) => <div className="matching-row" key={left}><span className="matching-number">0{index + 1}</span><strong>{left}</strong><ChevronDown size={15} /></div>)}</div>
      <div className="matching-column"><span className="tiny-label">CHỌN CỘT B</span>{item.leftItems.map((left, index) => <label className="matching-select" key={`${left}-select`}><span className="sr-only">Đáp án cho {left}</span><select value={values[index] < 0 ? "" : String(values[index])} onChange={(event) => { const next = [...values]; next[index] = event.target.value === "" ? -1 : Number(event.target.value); onChange(next); }}><option value="">Chọn…</option>{item.rightItems.map((right, rightIndex) => <option value={rightIndex} key={right}>{String.fromCharCode(65 + rightIndex)}. {right}</option>)}</select><ChevronDown size={15} /></label>)}</div>
    </div>
    {submitted && <Feedback correct={correct} answer={answerLabel(item)} explanation={item.explanation} />}
  </div>;
}

function ShortAnswer({ item, value, onChange, submitted, correct }: { item: ShortAnswerQuiz; value?: string; onChange: (value: string) => void; submitted: boolean; correct: boolean }) {
  return <div className="quiz-main">
    {item.image && <figure className="quiz-image"><img src={item.image.src} alt={item.image.alt} /><figcaption>Quan sát hình rồi viết câu trả lời.</figcaption></figure>}
    <strong>{item.prompt}</strong>
    <textarea className="quiz-textarea" value={value ?? ""} onChange={(event) => onChange(event.target.value)} rows={2} placeholder={item.placeholder ?? "Viết câu trả lời ở đây…"} aria-label="Câu trả lời ngắn" />
    {submitted && <Feedback correct={correct} answer={answerLabel(item)} explanation={item.explanation} />}
  </div>;
}

function Feedback({ correct, answer, explanation }: { correct: boolean; answer: string; explanation?: string }) {
  return <div className={`quiz-feedback-panel ${correct ? "is-correct" : "needs-review"}`} aria-live="polite"><span className="quiz-feedback-icon">{correct ? <Check size={15} /> : <CircleAlert size={15} />}</span><span><strong>{correct ? "Đúng" : "Xem lại"}</strong>{!correct && <small>Đáp án nguồn: {answer}</small>}{explanation && <small>{explanation}</small>}</span></div>;
}

export default function QuizRenderer({ items, onSubmit, onReset }: QuizRendererProps) {
  const normalizedItems = useMemo(() => items.map(normalizeQuizItem), [items]);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [submitted, setSubmitted] = useState(false);

  function setAnswer(id: string, answer: QuizAnswer) {
    setAnswers((current) => ({ ...current, [id]: answer }));
    setSubmitted(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const correct = normalizedItems.map((item) => scoreItem(item, answers[item.id ?? ""]));
    const result = { score: correct.filter(Boolean).length, total: normalizedItems.length, answered: normalizedItems.filter((item) => isAnswered(answers[item.id ?? ""])).length, correct };
    setSubmitted(true);
    onSubmit?.(result);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    onReset?.();
  }

  return <form className="quiz-block quiz-renderer" onSubmit={submit}>
    <div className="quiz-renderer-topline"><div><span className="tiny-label">BƯỚC 06 / WORKBOOK TEST</span><p>Làm theo yêu cầu của từng dạng bài. Chấm sau khi bạn hoàn thành.</p></div><span className="quiz-type-note"><Link2 size={14} /> {normalizedItems.length} câu</span></div>
    <div className="quiz-list">
      {normalizedItems.map((item, index) => {
        const id = item.id ?? `question-${index + 1}`;
        const correct = submitted && scoreItem(item, answers[id]);
        const shared = { key: id };
        if (item.type === "multiple-choice") return <div className="quiz-question" {...shared}><div className="quiz-number">{String(index + 1).padStart(2, "0")}</div><MultipleChoice item={item} value={answers[id] as number | undefined} onChange={(value) => setAnswer(id, value)} submitted={submitted} correct={correct} /></div>;
        if (item.type === "fill-blank") return <div className="quiz-question quiz-question-wide" {...shared}><div className="quiz-number">{String(index + 1).padStart(2, "0")}</div><FillBlank item={item} value={answers[id] as string[] | undefined} onChange={(value) => setAnswer(id, value)} submitted={submitted} correct={correct} /></div>;
        if (item.type === "transformation") return <div className="quiz-question quiz-question-wide" {...shared}><div className="quiz-number">{String(index + 1).padStart(2, "0")}</div><Transformation item={item} value={answers[id] as string | undefined} onChange={(value) => setAnswer(id, value)} submitted={submitted} correct={correct} /></div>;
        if (item.type === "matching") return <div className="quiz-question quiz-question-wide" {...shared}><div className="quiz-number">{String(index + 1).padStart(2, "0")}</div><Matching item={item} value={answers[id] as number[] | undefined} onChange={(value) => setAnswer(id, value)} submitted={submitted} correct={correct} /></div>;
        return <div className="quiz-question quiz-question-wide" {...shared}><div className="quiz-number">{String(index + 1).padStart(2, "0")}</div><ShortAnswer item={item} value={answers[id] as string | undefined} onChange={(value) => setAnswer(id, value)} submitted={submitted} correct={correct} /></div>;
      })}
    </div>
    <div className="quiz-renderer-actions"><button className="primary-action quiz-submit" type="submit"><Check size={17} /> {submitted ? "Chấm lại bài" : "Chấm bài kiểm tra"}</button>{submitted && <button className="quiet-action" type="button" onClick={reset}><RotateCcw size={15} /> Làm lại</button>}</div>
  </form>;
}
