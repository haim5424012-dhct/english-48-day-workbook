/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * ink navy on cool paper, Signal Coral for action, mint for progress,
 * asymmetrical reading canvas, perforation rules, DAY labels, and XONG stamps.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  Headphones,
  Keyboard,
  Lock,
  Menu,
  Mic,
  Pencil,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  Waves,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import daysData from "../data/days.json";
import { markDayComplete } from "../lib/progress";
import { initialSRSState, rateSRS, todayKey, type SRSCardState } from "../lib/srs";

type DayContent = {
  day: number;
  title: string;
  level: string;
  status: string;
  sourceNote?: string;
  warmupScript?: string;
  grammarContent?: string;
  listeningItems?: { audioText: string; blankSentence: string; answer: string }[];
  shadowingSentences?: string[];
  writingPrompts?: string[];
  quiz?: { question: string; options: string[]; correctIndex: number }[];
  srsCards?: { front: string; back: string }[];
};

type ProgressState = {
  completed: boolean[];
  quizScore: number | null;
  cardStates: SRSCardState[];
};

const day = (daysData.days.find((entry) => entry.status === "ready") ?? daysData.days[0]) as DayContent;
const storageKey = "english48-day1-progress";
const stepLabels = ["Khởi động", "Học", "Nghe chủ động", "Nói", "Viết", "Kiểm tra + Ôn tập"];
const stepSkills = ["Nghe thụ động", "Đọc + ngữ pháp", "Nghe + Viết", "Nói", "Viết", "Tổng hợp"];
const stepIcons = [Headphones, BookOpen, Waves, Mic, Pencil, RotateCcw];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function loadProgress(): ProgressState {
  const fallback: ProgressState = {
    completed: [false, false, false, false, false, false],
    quizScore: null,
    cardStates: (day.srsCards ?? []).map(initialSRSState),
  };

  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved) as Partial<ProgressState>;
    return {
      completed: Array.isArray(parsed.completed) ? [...fallback.completed.map((_, index) => Boolean(parsed.completed?.[index]))] : fallback.completed,
      quizScore: typeof parsed.quizScore === "number" ? parsed.quizScore : null,
      cardStates: Array.isArray(parsed.cardStates)
        ? fallback.cardStates.map((fallbackCard, index) => ({
            interval: Number(parsed.cardStates?.[index]?.interval) || fallbackCard.interval,
            easeFactor: Number(parsed.cardStates?.[index]?.easeFactor) || fallbackCard.easeFactor,
            lastReviewedAt: typeof parsed.cardStates?.[index]?.lastReviewedAt === "string" ? parsed.cardStates[index]?.lastReviewedAt ?? null : null,
          }))
        : fallback.cardStates,
    };
  } catch {
    return fallback;
  }
}

export default function Home() {
  const initialProgress = useMemo(loadProgress, []);
  const [activeStep, setActiveStep] = useState(() => initialProgress.completed.findIndex((done) => !done) === -1 ? 5 : Math.max(initialProgress.completed.findIndex((done) => !done), 0));
  const [completed, setCompleted] = useState(initialProgress.completed);
  const [quizScore, setQuizScore] = useState<number | null>(initialProgress.quizScore);
  const [cardStates, setCardStates] = useState(initialProgress.cardStates);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showWarmupText, setShowWarmupText] = useState(false);
  const [listenAnswers, setListenAnswers] = useState<Record<number, string>>({});
  const [listenFeedback, setListenFeedback] = useState<Record<number, "correct" | "try-again"> >({});
  const [shadowIndex, setShadowIndex] = useState(0);
  const [shadowTranscript, setShadowTranscript] = useState("");
  const [shadowFeedback, setShadowFeedback] = useState<"idle" | "recording" | "close" | "correct" | "unsupported" | "error">("idle");
  const [audioRecording, setAudioRecording] = useState<"idle" | "recording" | "ready" | "denied" | "unsupported" | "error">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [bestAudioUrl, setBestAudioUrl] = useState<string | null>(null);
  const [writingAnswers, setWritingAnswers] = useState<Record<number, string>>({});
  const [writingFeedback, setWritingFeedback] = useState<Record<number, "ready" | "good" | "revise"> >({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const recognitionRef = useRef<any>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const completedCount = completed.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / stepLabels.length) * 100);
  const currentSentence = day.shadowingSentences?.[shadowIndex] ?? "I am happy today.";
  const currentCard = day.srsCards?.[cardIndex];

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ completed, quizScore, cardStates } satisfies ProgressState));
  }, [completed, quizScore, cardStates]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.();
      recorderRef.current?.stop?.();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (bestAudioUrl) URL.revokeObjectURL(bestAudioUrl);
    };
  }, []);

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) {
      announce("Trình duyệt này chưa hỗ trợ phát âm tự động.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function completeStep(index: number) {
    setCompleted((current) => current.map((done, stepIndex) => stepIndex === index ? true : done));
    if (index < stepLabels.length - 1) {
      setActiveStep(index + 1);
      announce(`Bước ${index + 1} đã XONG. Bước tiếp theo đã mở.`);
    } else {
      markDayComplete(day.day);
      setCardStates((current) => current.map((state) => state.lastReviewedAt ? state : { ...state, lastReviewedAt: todayKey() }));
      announce("Ngày 1 đã XONG. Hãy quay lại ôn các thẻ có khoảng cách ngắn.");
    }
  }

  function activateStep(index: number) {
    if (index > 0 && !completed[index - 1]) {
      announce("Hãy hoàn thành bước trước để giữ đúng thứ tự Input trước Output.");
      return;
    }
    setActiveStep(index);
    document.getElementById("lesson-canvas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function checkListening(index: number) {
    const expected = normalize(day.listeningItems?.[index]?.answer ?? "");
    const actual = normalize(listenAnswers[index] ?? "");
    setListenFeedback((current) => ({ ...current, [index]: actual === expected ? "correct" : "try-again" }));
  }

  async function startAudioRecording() {
    if (audioRecording === "recording") {
      recorderRef.current?.stop();
      return;
    }
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setAudioRecording("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const recorder = preferredType ? new MediaRecorder(stream, { mimeType: preferredType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (audioUrl && audioUrl !== bestAudioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        setAudioRecording("ready");
      };
      recorder.onerror = () => setAudioRecording("error");
      recorder.start();
      setAudioRecording("recording");
    } catch {
      setAudioRecording("denied");
    }
  }
  function keepBestRecording() {
    if (!audioUrl) return;
    if (bestAudioUrl) URL.revokeObjectURL(bestAudioUrl);
    setBestAudioUrl(audioUrl);
    setAudioRecording("ready");
    announce("Đã giữ bản ghi này là bản tốt nhất cho câu hiện tại.");
  }
  function startShadowing() {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setShadowFeedback("unsupported");
      announce("SpeechRecognition chưa được hỗ trợ. Hãy dùng Chrome hoặc Edge và kiểm tra quyền micro.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setShadowFeedback("recording");
    recognition.onresult = (event: any) => {
      const transcript = String(event.results?.[0]?.[0]?.transcript ?? "");
      const targetWords = normalize(currentSentence).split(" ");
      const spokenWords = normalize(transcript).split(" ");
      const matched = targetWords.filter((word) => spokenWords.includes(word)).length / Math.max(targetWords.length, 1);
      setShadowTranscript(transcript);
      setShadowFeedback(matched >= 0.8 ? "correct" : "close");
    };
    recognition.onerror = () => {
      setShadowFeedback("error");
      announce("Không nhận được giọng nói. Hãy cho phép micro rồi thử lại.");
    };
    recognition.onend = () => setShadowFeedback((current) => current === "recording" ? "error" : current);
    recognitionRef.current = recognition;
    recognition.start();
  }

  function checkWriting(index: number) {
    // TODO: thay bằng nội dung gốc khi có link; checkWriting() có thể nối API AI ở giai đoạn nâng cấp.
    const answer = normalize(writingAnswers[index] ?? "");
    const hasToBe = /\b(am|is|are|isn't|aren't|am not|is not|are not)\b/.test(answer);
    setWritingFeedback((current) => ({ ...current, [index]: answer.length > 5 && hasToBe ? "good" : "revise" }));
  }

  function submitQuiz() {
    const score = (day.quiz ?? []).reduce((total, question, index) => total + (quizAnswers[index] === question.correctIndex ? 1 : 0), 0);
    setQuizScore(score);
    setQuizSubmitted(true);
  }

  function rateCard(remembered: boolean) {
    setCardStates((current) => current.map((state, index) => {
      if (index !== cardIndex) return state;
      return rateSRS(state, remembered);
    }));
    setCardFlipped(false);
    setCardIndex((current) => ((current + 1) % Math.max(day.srsCards?.length ?? 1, 1)));
    announce(remembered ? "Đã lên lịch ôn lại theo khoảng cách." : "Đã đưa thẻ về hàng đợi ôn sớm.");
  }

  function renderStepContent() {
    if (activeStep === 0) {
      return (
        <div className="step-content step-content-warmup">
          <div className="section-kicker">01 / LISTEN FIRST</div>
          <div className="warmup-intro">
            <div>
              <h3>Nghe một đoạn ngắn. Chưa cần hiểu hết.</h3>
              <p>Chạm phát âm, nghe nhịp câu và đoán xem <em>am / is / are</em> đang đứng ở đâu.</p>
            </div>
            <div className="warmup-stamp">LISTEN<br /><span>FIRST</span></div>
          </div>
          <div className="audio-card">
            <div className="audio-card-topline"><span className="tiny-label">CONVERSATION / 00:18</span><span className="audio-wave"><i /><i /><i /><i /><i /><i /></span></div>
            <div className={`warmup-lines ${showWarmupText ? "is-revealed" : ""}`} aria-live="polite">
              {(day.warmupScript ?? "").split("\n").map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="audio-actions">
              <button className="primary-action" onClick={() => speak((day.warmupScript ?? "").replaceAll("\n", " "))}><Volume2 size={18} /> Nghe đoạn mẫu</button>
              <button className="quiet-action" onClick={() => setShowWarmupText((visible) => !visible)}>{showWarmupText ? <EyeOff size={16} /> : <Eye size={16} />} {showWarmupText ? "Ẩn chữ" : "Hiện chữ"}</button>
            </div>
          </div>
          <div className="observation-note"><Sparkles size={16} /><span>Ghi nhớ nhanh: khi nghe thấy <strong>I'm</strong>, đó là <strong>I am</strong>.</span></div>
          <CompleteButton index={0} done={completed[0]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 1) {
      return (
        <div className="step-content">
          <div className="section-kicker">02 / BUILD THE RULE</div>
          <div className="content-heading-row"><div><h3>To be là chiếc cầu nối của câu.</h3><p>Nhìn chủ ngữ trước. Chọn đúng <strong>am / is / are</strong> sau đó mới quyết định có thêm <strong>not</strong> hay không.</p></div><span className="page-number">p. 01</span></div>
          <div className="grammar-panel" dangerouslySetInnerHTML={{ __html: day.grammarContent ?? "" }} />
          <div className="example-grid">
            <ExampleCard label="KHẲNG ĐỊNH" tone="coral" sentence="She is a teacher." note="She + is + danh từ" />
            <ExampleCard label="PHỦ ĐỊNH" tone="mint" sentence="They aren't ready." note="They + are not + tính từ" />
            <ExampleCard label="NHỚ NHANH" tone="yellow" sentence="I am at home." note="I luôn đi với am" />
          </div>
          <div className="micro-check"><CircleHelp size={17} /><span>Thử tự hỏi: “Lan là học sinh.” → <strong>Lan is a student.</strong></span></div>
          <CompleteButton index={1} done={completed[1]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <div className="step-content">
          <div className="section-kicker">03 / ACTIVE LISTENING</div>
          <div className="content-heading-row"><div><h3>Nghe, điền, kiểm tra ngay.</h3><p>Đừng nhìn đáp án trước. Mỗi ô trống là một lần buộc tai phải chú ý đến động từ.</p></div><span className="task-count">{Object.values(listenFeedback).filter((value) => value === "correct").length}/3 đúng</span></div>
          <div className="listening-list">
            {(day.listeningItems ?? []).map((item, index) => (
              <div className={`listening-item ${listenFeedback[index] === "correct" ? "is-correct" : ""}`} key={item.blankSentence}>
                <span className="item-index">0{index + 1}</span>
                <div className="listening-body"><button className="icon-action" aria-label={`Nghe câu ${index + 1}`} onClick={() => speak(item.audioText)}><Volume2 size={18} /></button><span>{item.blankSentence.replace("___", "")}</span><input aria-label={`Đáp án câu ${index + 1}`} value={listenAnswers[index] ?? ""} onChange={(event) => setListenAnswers((current) => ({ ...current, [index]: event.target.value }))} onKeyDown={(event) => event.key === "Enter" && checkListening(index)} placeholder="..." /></div>
                <div className="item-feedback">{listenFeedback[index] === "correct" ? <><Check size={15} /> Chuẩn</> : listenFeedback[index] === "try-again" ? "Thử lại" : ""}</div>
                <button className="text-action" onClick={() => checkListening(index)}>Kiểm tra</button>
              </div>
            ))}
          </div>
          <div className="dictation-note"><Keyboard size={17} /><span>Đây là bài <strong>dictation</strong>: nghe rồi gõ lại chính xác, không chỉ chọn đáp án.</span></div>
          <CompleteButton index={2} done={completed[2]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 3) {
      return (
        <div className="step-content">
          <div className="section-kicker">04 / SHADOWING</div>
          <div className="content-heading-row"><div><h3>Nghe mẫu. Nói lại. So khớp.</h3><p>SpeechRecognition chỉ giúp máy so khớp văn bản nhận được; MediaRecorder lưu lại âm thanh thật để bạn tự nghe và chọn bản tốt nhất.</p></div><span className="task-count">Câu {shadowIndex + 1}/3</span></div>
          <div className="shadow-card">
            <div className="shadow-card-label">CÂU MẪU / SHADOWING</div>
            <div className="shadow-sentence">{currentSentence}</div>
            <div className="shadow-controls"><button className="primary-action" onClick={() => speak(currentSentence)}><Volume2 size={18} /> Nghe giọng mẫu</button><button className={`record-action ${shadowFeedback === "recording" ? "is-recording" : ""}`} onClick={startShadowing}><Mic size={18} /> {shadowFeedback === "recording" ? "Đang nghe…" : "So khớp câu nói"}</button><button className={`record-action ${audioRecording === "recording" ? "is-recording" : ""}`} onClick={startAudioRecording}><Mic size={18} /> {audioRecording === "recording" ? "Dừng ghi âm" : "Ghi âm thật"}</button></div>
            <div className={`shadow-result result-${shadowFeedback}`} aria-live="polite">
              {shadowFeedback === "idle" && "Bạn đã sẵn sàng nói lại câu này chưa?"}
              {shadowFeedback === "recording" && "Đang nhận giọng nói — nói trọn câu nhé."}
              {shadowFeedback === "correct" && <><Check size={17} /> Câu bạn nói khớp với câu mẫu.</>}
              {shadowFeedback === "close" && <><Waves size={17} /> Chưa khớp hoàn toàn. Nghe lại câu mẫu rồi thử lại.</>}
              {shadowFeedback === "unsupported" && "Trình duyệt chưa hỗ trợ SpeechRecognition. Hãy dùng Chrome/Edge và bật quyền micro."}
              {shadowFeedback === "error" && "Chưa nhận được câu nói. Kiểm tra micro rồi thử lại."}
              {audioRecording === "denied" && "Micro bị từ chối. Hãy cho phép quyền micro trong cài đặt trình duyệt rồi thử lại."}
              {audioRecording === "unsupported" && "Trình duyệt chưa hỗ trợ MediaRecorder hoặc không cấp được micro."}
              {audioRecording === "error" && "Ghi âm chưa thành công. Kiểm tra micro rồi thử lại."}
            </div>
            {shadowTranscript && <div className="transcript-line"><span>Máy nghe được:</span> “{shadowTranscript}”</div>}
            {audioUrl && <div className="recording-review"><span className="tiny-label">BẢN GHI TẠM / CÂU {shadowIndex + 1}</span><div className="recording-actions"><audio controls src={audioUrl} aria-label="Nghe lại giọng bạn" /><button className="text-action" onClick={() => speak(currentSentence)}>Nghe giọng mẫu</button><button className="text-action" onClick={keepBestRecording}>Giữ bản tốt nhất</button></div>{bestAudioUrl === audioUrl && <small>Đã giữ bản này cho câu hiện tại.</small>}</div>}
          </div>
          <div className="sentence-switcher"><button className="circle-button" aria-label="Câu trước" onClick={() => { setShadowIndex((current) => (current + 2) % 3); setShadowFeedback("idle"); setShadowTranscript(""); }}><ChevronLeft size={18} /></button><div className="dot-row">{(day.shadowingSentences ?? []).map((sentence, index) => <button aria-label={`Chọn câu ${index + 1}`} className={index === shadowIndex ? "active" : ""} key={sentence} onClick={() => { setShadowIndex(index); setShadowFeedback("idle"); setShadowTranscript(""); }} />)}</div><button className="circle-button" aria-label="Câu tiếp" onClick={() => { setShadowIndex((current) => (current + 1) % 3); setShadowFeedback("idle"); setShadowTranscript(""); }}><ChevronRight size={18} /></button></div>
          <CompleteButton index={3} done={completed[3]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 4) {
      return (
        <div className="step-content">
          <div className="section-kicker">05 / MAKE IT YOURS</div>
          <div className="content-heading-row"><div><h3>Viết câu mới, không chép lại.</h3><p>Bản demo dùng heuristic để phản hồi tức thì: câu cần có chủ ngữ, nội dung và một dạng <strong>to be</strong>.</p></div><span className="page-number">2 prompts</span></div>
          <div className="writing-list">
            {(day.writingPrompts ?? []).map((prompt, index) => (
              <div className="writing-item" key={prompt}><div className="writing-prompt"><span className="item-index">0{index + 1}</span><span>{prompt}</span></div><textarea aria-label={prompt} value={writingAnswers[index] ?? ""} onChange={(event) => { setWritingAnswers((current) => ({ ...current, [index]: event.target.value })); setWritingFeedback((current) => ({ ...current, [index]: "ready" })); }} placeholder="Write your sentence here…" rows={2} /><div className="writing-footer"><span className={`writing-hint hint-${writingFeedback[index] ?? "ready"}`}>{writingFeedback[index] === "good" ? <><Check size={15} /> Câu có to be — tốt lắm.</> : writingFeedback[index] === "revise" ? "Hãy thêm am / is / are và viết câu dài hơn một chút." : "Phản hồi sẽ xuất hiện ngay tại đây."}</span><button className="text-action" onClick={() => checkWriting(index)}>Kiểm tra câu</button></div></div>
            ))}
          </div>
          <CompleteButton index={4} done={completed[4]} onComplete={completeStep} />
        </div>
      );
    }

    return (
      <div className="step-content">
        <div className="section-kicker">06 / TEST + SPACE IT OUT</div>
        <div className="content-heading-row"><div><h3>Kiểm tra để nhớ lâu hơn.</h3><p>Làm quiz trước, sau đó lật thẻ và tự đánh dấu mức độ nhớ. Kết quả được lưu trên thiết bị này.</p></div><span className="page-number">{quizScore === null ? "not scored" : `${quizScore}/${day.quiz?.length ?? 0}`}</span></div>
        <div className="quiz-block">
          {(day.quiz ?? []).map((question, index) => <div className="quiz-question" key={question.question}><div className="quiz-number">0{index + 1}</div><div className="quiz-main"><strong>{question.question}</strong><div className="option-row">{question.options.map((option, optionIndex) => <button className={quizAnswers[index] === optionIndex ? "selected" : ""} key={option} onClick={() => { setQuizAnswers((current) => ({ ...current, [index]: optionIndex })); setQuizSubmitted(false); }}>{String.fromCharCode(65 + optionIndex)}. {option}</button>)}</div>{quizSubmitted && <span className={quizAnswers[index] === question.correctIndex ? "quiz-feedback good" : "quiz-feedback revise"}>{quizAnswers[index] === question.correctIndex ? "Đúng" : `Đáp án: ${question.options[question.correctIndex]}`}</span>}</div></div>)}
          <button className="primary-action quiz-submit" onClick={submitQuiz}>Chấm bài kiểm tra <ArrowRight size={17} /></button>
        </div>
        <div className="flashcard-block"><div className="flashcard-heading"><div><div className="section-kicker">SRS / FLASHCARD {cardIndex + 1}/{day.srsCards?.length ?? 0}</div><h4>Một thẻ, một lần nhớ có chủ đích.</h4></div><span className="interval-label">Ôn sau {cardStates[cardIndex]?.interval ?? 1} ngày</span></div>{currentCard && <button className={`flashcard ${cardFlipped ? "is-flipped" : ""}`} onClick={() => setCardFlipped((flipped) => !flipped)} aria-label="Lật flashcard"><span className="flashcard-face flashcard-front"><span className="tiny-label">MẶT TRƯỚC</span><strong>{currentCard.front}</strong><span className="flip-hint">Chạm để lật thẻ</span></span><span className="flashcard-face flashcard-back"><span className="tiny-label">MẶT SAU</span><strong>{currentCard.back}</strong><span className="flip-hint">Chạm để xem mặt trước</span></span></button>}{cardFlipped && <div className="flashcard-actions"><button className="remember-action" onClick={() => rateCard(false)}>Chưa nhớ</button><button className="primary-action" onClick={() => rateCard(true)}><Check size={16} /> Nhớ</button></div>}</div>
        <CompleteButton index={5} done={completed[5]} onComplete={completeStep} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="48 Ngày Lấy Gốc Tiếng Anh"><span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></a>
        <nav className={`topnav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Điều hướng chính"><a href="#lesson" onClick={() => setMobileMenuOpen(false)}>Bài học</a><a href="#plan" onClick={() => setMobileMenuOpen(false)}>Lịch 48 ngày</a><a href="#principles" onClick={() => setMobileMenuOpen(false)}>Phương pháp</a></nav>
        <div className="topbar-actions"><span className="streak"><Sparkles size={15} /> 01 ngày liên tiếp</span><button className="menu-toggle" aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> DAY 01 / FOUNDATION</div><h1>48 ngày để<br /><em>xây lại</em> nền tảng.</h1><p className="hero-lede">Một workbook tương tác giúp bạn học lại tiếng Anh bằng tai, bằng miệng, bằng tay — từng bước nhỏ nhưng có thể nhìn thấy.</p><div className="hero-actions"><a className="primary-action hero-cta" href="#lesson">Bắt đầu Ngày 1 <ArrowRight size={18} /></a><a className="secondary-action" href="#principles">Xem cách học <CircleHelp size={16} /></a></div><div className="hero-footnote"><span>01</span><span>THỂ KHẲNG ĐỊNH & PHỦ ĐỊNH</span><span className="footnote-rule" /><span>15–20 phút</span></div></div>
            <div className="hero-visual"><img src="/manus-storage/english-workbook-hero_ff29b05e.png" alt="Bàn học với workbook tiếng Anh và các nhãn nghe, nói, đọc, viết" /><div className="visual-note note-top"><span>HEAR IT</span><Volume2 size={16} /></div><div className="visual-note note-bottom"><span>MAKE A MARK</span><Check size={15} /></div></div>
          </div>
          <div className="hero-progress"><div className="progress-copy"><span className="tiny-label">TIẾN TRÌNH NGÀY 01</span><strong>{completedCount} / 6 bước đã XONG</strong><span className="progress-sequence">01 NGHE · 02 HỌC · 03 NGHE · 04 NÓI · 05 VIẾT · 06 ÔN</span></div><div className="progress-track"><span style={{ width: `${Math.max(progressPercent, 4)}%` }} /></div><span className="progress-value">{progressPercent}%</span></div>
        </section>

        <section className="study-shell" id="lesson">
          <aside className="step-rail" aria-label="Các bước trong Ngày 1"><div className="rail-title"><span className="tiny-label">TODAY'S SEQUENCE</span><strong>06 bước<br />một mạch.</strong></div><div className="rail-steps">{stepLabels.map((label, index) => { const Icon = stepIcons[index]; const locked = index > 0 && !completed[index - 1]; return <button className={`rail-step ${activeStep === index ? "active" : ""} ${completed[index] ? "done" : ""} ${locked ? "locked" : ""}`} key={label} onClick={() => activateStep(index)} aria-current={activeStep === index ? "step" : undefined}><span className="rail-step-number">{completed[index] ? <Check size={14} /> : locked ? <Lock size={13} /> : `0${index + 1}`}</span><span className="rail-step-copy"><strong>{label}</strong><small>{stepSkills[index]}</small></span>{completed[index] && <span className="done-stamp">XONG</span>}</button>; })}</div><div className="rail-note"><Pencil size={16} /><span>Input trước.<br />Output sau.</span></div></aside>
          <div className="study-canvas" id="lesson-canvas"><div className="canvas-header"><div><div className="eyebrow"><span className="eyebrow-dot" /> BÀI HỌC TƯƠNG TÁC</div><h2>{day.title}</h2><p>Hôm nay bạn không học thuộc một công thức. Bạn sẽ nghe nó, nhìn nó, nói nó và tự viết một câu của mình.</p></div><div className="canvas-meta"><span className="day-label">DAY<br /><strong>01</strong></span><span className="source-code">CORE<br />GRAMMAR</span></div></div><div className="perforation" /><div className="mobile-step-strip">{stepLabels.map((label, index) => <button className={`${activeStep === index ? "active" : ""} ${completed[index] ? "done" : ""}`} key={label} onClick={() => activateStep(index)}>{completed[index] ? <Check size={14} /> : `0${index + 1}`}<span>{label}</span></button>)}</div><div className="step-panel">{renderStepContent()}</div><div className="source-strip"><span className="source-dot" /><span>{day.sourceNote}</span><a href={daysData.sourceUrl} target="_blank" rel="noreferrer">Mở nguồn gốc <ArrowRight size={14} /></a></div></div>
        </section>

        <section className="principles-section" id="principles"><div className="principles-intro"><div className="section-kicker">WHY THIS WORKS</div><h2>Học như một quyển vở,<br /><em>nhớ như một thói quen.</em></h2><p>Không lướt qua lý thuyết. Mỗi ngày đặt bạn vào một chuỗi hành động có chủ đích — nghe trước, tạo đầu ra sau, rồi quay lại đúng lúc để trí nhớ được củng cố.</p><div className="method-annotation"><span>METHOD / 06</span><i>input → output → return</i></div></div><div className="principles-list"><Principle number="01" title="Input → Output" copy="Tai và mắt nhận mẫu trước khi miệng và tay tạo câu mới." /><Principle number="02" title="Feedback now" copy="Mỗi ô trả lời có phản hồi ngay, để lỗi trở thành thông tin." /><Principle number="03" title="Return later" copy="Flashcard dùng khoảng cách tăng dần, không để kiến thức rơi mất." /></div></section>

        <section className="journey-section" id="plan"><div className="journey-copy"><div className="section-kicker">THE 48-DAY MAP</div><h2>Một đường đi rõ ràng<br />từ <em>gốc</em> đến tự tin.</h2><p>Ngày 1–17 dựng khung ngữ pháp. Ngày 18–33 đưa tai và miệng vào cuộc. Các ngày còn lại sẽ tiếp tục được mở khi dữ liệu gốc được bổ sung.</p><div className="step-ticker" aria-label="Chuỗi sáu bước"><span className="is-active">01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span></div><a className="secondary-action" href="#lesson">Quay lại bài học <ArrowLeft size={16} /></a></div><div className="journey-art"><img src="/manus-storage/english-workbook-journey_ddf185cf.png" alt="Sơ đồ sáu trạm học từ nghe đến ôn tập" /></div></section>

        <section className="day-map"><div className="day-map-heading"><div><div className="section-kicker">COURSE INDEX / 48 DAYS</div><h2>Ngày nào cũng có một<br /><em>việc nhỏ để làm.</em></h2></div><span className="index-count"><span className="index-active-dot" />01 <span>/</span> 48</span></div><div className="day-grid">{daysData.days.slice(0, 12).map((entry) => <button className={`day-tile ${entry.status === "ready" ? "ready" : ""}`} key={entry.day} onClick={() => entry.status === "ready" ? activateStep(0) : announce("Ngày này đang chờ nội dung gốc được bổ sung vào days.json.")}><span className="day-tile-meta">LESSON / {String(entry.day).padStart(2, "0")}</span><span className="day-tile-number">{String(entry.day).padStart(2, "0")}</span><span className="day-tile-title">{entry.title}</span><span className="day-tile-status">{entry.status === "ready" ? <><Check size={13} /> Đang học</> : <><span className="lock-dash">LOCKED</span> Sắp mở</>}</span>{entry.status !== "ready" && <Lock size={15} />}</button>)}</div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src="/manus-storage/english-workbook-mark_c4f80e77.png" alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><p>Build the habit. Keep the mark.</p><span className="footer-note">Lưu tiến trình trên thiết bị này · {completedCount}/6 bước</span></footer>
      {notice && <div className="toast-notice" role="status"><Sparkles size={16} /> {notice}</div>}
    </div>
  );
}

function CompleteButton({ index, done, onComplete }: { index: number; done: boolean; onComplete: (index: number) => void }) {
  return <div className="complete-row"><span className="complete-rule" />{done ? <span className="completed-label"><Check size={16} /> BƯỚC {String(index + 1).padStart(2, "0")} ĐÃ XONG</span> : <button className="complete-button" onClick={() => onComplete(index)}>Đánh dấu bước này XONG <Check size={16} /></button>}</div>;
}

function ExampleCard({ label, tone, sentence, note }: { label: string; tone: string; sentence: string; note: string }) {
  return <div className={`example-card tone-${tone}`}><span className="tiny-label">{label}</span><strong>{sentence}</strong><span>{note}</span></div>;
}

function Principle({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <div className="principle-row"><span className="principle-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight size={18} /></div>;
}
