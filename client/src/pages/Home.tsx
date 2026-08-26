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
import { isDayReady, markDayComplete, readRoadmapProgress } from "../lib/progress";
import { canCompleteStep, hasLessonBlocks, isShadowingTranscriptCorrect, setShadowingSentenceResult, type CompletionEvidence } from "../lib/lessonValidation";
import { initialSRSState, rateSRS, todayKey, type SRSCardState } from "../lib/srs";
import QuizRenderer from "../components/QuizRenderer";
import type { QuizItem } from "../lib/quizSchema";
import { assetPath, routePath } from "../lib/routes";

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
  quiz?: (QuizItem | { question: string; options: string[]; correctIndex: number })[];
  srsCards?: { front: string; back: string }[];
  learningObjectives?: string[];
  prerequisites?: string;
  bridgeFromPreviousDay?: string;
  commonMistakes?: string[];
  masteryCriteria?: string;
  estimatedMinutes?: number;
  contentOrigin?: string;
  pronunciationFocus?: string;
  writingRules?: string[];
  writingKeywords?: string[];
  introduces?: string[];
  reinforces?: string[];
  preparesFor?: string[];
  retrievalFromDays?: number[];
  canDoOutcome?: string;
  projectPhase?: string;
  rubric?: string[];
};

type ProgressState = {
  completed: boolean[];
  quizScore: number | null;
  cardStates: SRSCardState[];
  shadowPassed: boolean[];
};

const requestedDay = typeof window !== "undefined" ? Number((window.__COMET_PREVIEW_PATH__ ?? window.location.pathname).match(/ngay\/(\d+)/)?.[1] ?? 1) : 1;
const day = (daysData.days.find((entry) => entry.day === requestedDay) ?? daysData.days[0]) as DayContent;
const storageKey = `english48-day${day.day}-progress`;
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

export function isListeningAnswerCorrect(item: { audioText: string; blankSentence: string; answer: string }, value: string) {
  const actual = normalize(value);
  const accepted = new Set([
    normalize(item.answer),
    normalize(item.audioText),
    normalize(item.blankSentence.replace("___", item.answer)),
  ]);
  return accepted.has(actual);
}

function loadProgress(): ProgressState {
  const fallback: ProgressState = {
    completed: [false, false, false, false, false, false],
    quizScore: null,
    cardStates: (day.srsCards ?? []).map(initialSRSState),
    shadowPassed: Array.from({ length: day.shadowingSentences?.length ?? 0 }, () => false),
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
      shadowPassed: Array.isArray(parsed.shadowPassed)
        ? fallback.shadowPassed.map((_, index) => Boolean(parsed.shadowPassed?.[index]))
        : fallback.shadowPassed,
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
  const listenInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const [shadowIndex, setShadowIndex] = useState(0);
  const [shadowTranscript, setShadowTranscript] = useState("");
  const [shadowPassed, setShadowPassed] = useState<boolean[]>(() => initialProgress.shadowPassed);
  const [shadowFeedback, setShadowFeedback] = useState<"idle" | "recording" | "close" | "correct" | "unsupported" | "error">("idle");
  const [audioRecording, setAudioRecording] = useState<"idle" | "recording" | "ready" | "denied" | "unsupported" | "error">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [bestAudioUrls, setBestAudioUrls] = useState<(string | null)[]>(() => Array.from({ length: day.shadowingSentences?.length ?? 0 }, () => null));
  const [writingAnswers, setWritingAnswers] = useState<Record<number, string>>({});
  const [writingFeedback, setWritingFeedback] = useState<Record<number, "ready" | "good" | "revise"> >({});
  const [writingMessages, setWritingMessages] = useState<Record<number, string>>({});
  const [notice, setNotice] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const recognitionRef = useRef<any>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string | null>(null);
  const bestAudioUrlsRef = useRef<(string | null)[]>([]);
  const discardRecordingRef = useRef(false);

  const completedCount = completed.filter(Boolean).length;
  const evidence: CompletionEvidence = {
    listeningCorrect: Object.values(listenFeedback).filter((value) => value === "correct").length,
    shadowingPassed: shadowPassed,
    writingGood: Object.values(writingFeedback).filter((value) => value === "good").length,
    quizScore,
    reviewedCards: cardStates.filter((state) => Boolean(state.lastReviewedAt)).length,
  };

  useEffect(() => {
    audioUrlRef.current = audioUrl;
    bestAudioUrlsRef.current = bestAudioUrls;
  }, [audioUrl, bestAudioUrls]);
  const progressPercent = Math.round((completedCount / stepLabels.length) * 100);
  const currentSentence = day.shadowingSentences?.[shadowIndex] ?? "I am happy today.";
  const currentCard = day.srsCards?.[cardIndex];

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ completed, quizScore, cardStates, shadowPassed } satisfies ProgressState));
  }, [completed, quizScore, cardStates, shadowPassed]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.();
      recorderRef.current?.stop?.();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      const urls = new Set([audioUrlRef.current, ...bestAudioUrlsRef.current].filter((url): url is string => Boolean(url)));
      urls.forEach((url) => URL.revokeObjectURL(url));
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
    if (index !== activeStep || (index > 0 && !completed[index - 1])) {
      announce("Hãy hoàn thành bước trước để giữ đúng thứ tự Input trước Output.");
      return;
    }
    if (!canCompleteStep(index, day, evidence)) {
      const messages = ["Hãy nghe đoạn mẫu trước khi đánh dấu.", "Hãy đọc phần lý thuyết trước khi đánh dấu.", "Cần đúng đủ 3 câu dictation.", "Cần nói khớp đủ 3 câu shadowing.", "Cần đạt đủ 2 câu viết.", "Cần đạt ít nhất 4/5 quiz và đánh giá đủ 5 thẻ SRS."];
      announce(messages[index] ?? "Chưa đủ bằng chứng để đánh dấu bước này.");
      return;
    }
    const nextCompleted = completed.map((done, stepIndex) => stepIndex === index ? true : done);
    setCompleted(nextCompleted);
    if (index < stepLabels.length - 1) {
      setActiveStep(index + 1);
      announce(`Bước ${index + 1} đã XONG. Bước tiếp theo đã mở.`);
    } else {
      markDayComplete(day.day);
      announce(`Ngày ${day.day} đã XONG. Hãy quay lại ôn các thẻ theo lịch.`);
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
    const item = day.listeningItems?.[index];
    if (!item) return;
    const correct = isListeningAnswerCorrect(item, listenAnswers[index] ?? "");
    setListenFeedback((current) => ({ ...current, [index]: correct ? "correct" : "try-again" }));
    announce(correct ? `Câu ${index + 1} đúng, đã tính điểm.` : `Câu ${index + 1} chưa đúng. Bạn có thể sửa hoặc bấm Thử lại.`);
  }

  function retryListening(index: number) {
    setListenAnswers((current) => ({ ...current, [index]: "" }));
    setListenFeedback((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });
    window.setTimeout(() => listenInputRefs.current[index]?.focus(), 0);
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
      discardRecordingRef.current = false;
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const recorder = preferredType ? new MediaRecorder(stream, { mimeType: preferredType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const wasDiscarded = discardRecordingRef.current;
        discardRecordingRef.current = false;
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        if (wasDiscarded) {
          audioChunksRef.current = [];
          setAudioUrl(null);
          setAudioRecording("idle");
          return;
        }
        if (audioUrl && audioUrl !== bestAudioUrls[shadowIndex]) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
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
    const currentBest = bestAudioUrls[shadowIndex];
    if (currentBest && currentBest !== audioUrl) URL.revokeObjectURL(currentBest);
    setBestAudioUrls((current) => current.map((url, index) => index === shadowIndex ? audioUrl : url));
    setShadowPassed((current) => setShadowingSentenceResult(current, shadowIndex, true));
    setShadowFeedback("correct");
    setAudioRecording("ready");
    announce("Đã giữ bản ghi và tính câu này là một bằng chứng luyện Shadowing.");
  }

  function changeShadowSentence(nextIndex: number) {
    discardRecordingRef.current = true;
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    recorderRef.current = null;
    const currentBest = bestAudioUrls[shadowIndex];
    if (audioUrl && audioUrl !== currentBest) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setAudioRecording("idle");
    setShadowFeedback("idle");
    setShadowTranscript("");
    // Keep completed results for the other sentences; only the current sentence is re-evaluated when spoken again.
    setShadowIndex(nextIndex);
  }
  function confirmShadowFallback() {
    setShadowPassed((current) => setShadowingSentenceResult(current, shadowIndex, true));
    setShadowFeedback("correct");
    setShadowTranscript("Tự xác nhận đã luyện nghe mẫu và nói lại.");
    announce("Đã lưu fallback tự xác nhận cho câu này; đây không phải điểm chấm phát âm.");
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
      const passed = isShadowingTranscriptCorrect(currentSentence, transcript);
      setShadowTranscript(transcript);
      setShadowPassed((current) => setShadowingSentenceResult(current, shadowIndex, passed));
      setShadowFeedback(passed ? "correct" : "close");
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
    const raw = writingAnswers[index] ?? "";
    const answer = normalize(raw);
    const wordCount = answer ? answer.split(" ").filter(Boolean).length : 0;
    const keywords = day.writingKeywords ?? [];
    const hasKeyword = keywords.length === 0 || keywords.some((keyword) => answer.includes(normalize(keyword)));
    const hasVerb = /\b(am|is|are|do|does|did|was|were|have|has|will|can|should|must|enjoy|like|play|use|work|thank|sorry|would)\b/.test(answer);
    const hasPunctuation = /[.!?]$/.test(raw.trim());
    const good = wordCount >= 4 && hasKeyword && hasVerb && hasPunctuation;
    const message = good ? "Đủ ý: có cấu trúc/từ khóa của bài, động từ và dấu câu." : !hasKeyword ? `Thiếu từ khóa của bài: ${(keywords.slice(0, 3).join(", ") || "từ khóa mục tiêu")}.` : !hasVerb ? "Thiếu động từ hoặc trợ động từ; hãy kiểm tra khung câu." : !hasPunctuation ? "Thêm dấu chấm, chấm hỏi hoặc dấu chấm than ở cuối câu." : "Câu còn ngắn hoặc thiếu ý; viết ít nhất bốn từ theo đúng prompt.";
    setWritingFeedback((current) => ({ ...current, [index]: good ? "good" : "revise" }));
    setWritingMessages((current) => ({ ...current, [index]: message }));
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
      if (!day.warmupScript?.trim()) return <div className="step-content"><div className="section-kicker">01 / SOURCE STATUS</div><div className="source-gap"><h3>Chưa có phần nghe trong nguồn đã trích xuất.</h3><p>BÀI HỌC của ngày này là video YouTube chưa có transcript được xác minh. Không tự tạo đoạn nghe thay thế.</p></div><CompleteButton index={0} done={completed[0]} onComplete={completeStep} /></div>;
      return (
        <div className="step-content step-content-warmup">
          <div className="section-kicker">01 / LISTEN FIRST</div>
          <div className="warmup-intro">
            <div>
              <h3>Nghe một đoạn ngắn. Chưa cần hiểu hết.</h3>
              <p>Chạm phát âm TTS, nghe nhịp câu và tập trung vào điểm phát âm: <em>{day.pronunciationFocus}</em></p>
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
          <div className="content-heading-row"><div><h3>{day.title}</h3><p>{day.contentOrigin === "source-extracted" ? "Đọc phần lý thuyết đã trích từ tài liệu nguồn." : "Đọc phần lý thuyết và thực hành do workbook biên soạn, có ghi rõ nguồn."}</p></div><span className="page-number">p. 01</span></div>
          {day.grammarContent ? <div className="grammar-panel" dangerouslySetInnerHTML={{ __html: day.grammarContent }} /> : <div className="source-gap"><h3>Chưa trích xuất được phần lý thuyết đầy đủ từ nguồn Ngày {day.day}.</h3><p>Xem ghi chú nguồn bên dưới để biết chi tiết về phần tài liệu còn thiếu.</p></div>}
          
          <CompleteButton index={1} done={completed[1]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 2) {
      if (!(day.listeningItems?.length)) return <div className="step-content"><div className="section-kicker">03 / SOURCE STATUS</div><div className="source-gap"><h3>Chưa có phần nghe–chép chính tả trong nguồn.</h3><p>Tài liệu gốc đã đọc không cung cấp bài tập listening theo schema hiện có; phần này được để trống để bảo toàn dữ liệu.</p></div><CompleteButton index={2} done={completed[2]} onComplete={completeStep} /></div>;
      return (
        <div className="step-content">
          <div className="section-kicker">03 / ACTIVE LISTENING</div>
          <div className="content-heading-row"><div><h3>Nghe, điền, kiểm tra ngay.</h3><p>Đừng nhìn đáp án trước. Mỗi ô trống là một lần buộc tai phải chú ý đến động từ.</p></div><span className="task-count">{Object.values(listenFeedback).filter((value) => value === "correct").length}/3 đúng</span></div>
          <div className="listening-list">
            {(day.listeningItems ?? []).map((item, index) => (
              <div className={`listening-item ${listenFeedback[index] === "correct" ? "is-correct" : ""}`} key={item.blankSentence}>
                <span className="item-index">0{index + 1}</span>
                <div className="listening-body"><button className="icon-action" aria-label={`Nghe câu ${index + 1}`} onClick={() => speak(item.audioText)}><Volume2 size={18} /></button><span>{item.blankSentence.replace("___", "")}</span><input ref={(element) => { listenInputRefs.current[index] = element; }} aria-label={`Đáp án câu ${index + 1}`} value={listenAnswers[index] ?? ""} onChange={(event) => { setListenAnswers((current) => ({ ...current, [index]: event.target.value })); setListenFeedback((current) => { const next = { ...current }; delete next[index]; return next; }); }} onKeyDown={(event) => event.key === "Enter" && checkListening(index)} placeholder="Từ còn thiếu hoặc cả câu..." /></div>
                <div className="item-feedback" aria-live="polite">{listenFeedback[index] === "correct" ? <><Check size={15} /> Đúng +1</> : listenFeedback[index] === "try-again" ? <button className="text-action retry-action" type="button" onClick={() => retryListening(index)}>Thử lại</button> : ""}</div>
                <button className="text-action" type="button" onClick={() => checkListening(index)}>Kiểm tra</button>
              </div>
            ))}
          </div>
          <div className="dictation-note"><Keyboard size={17} /><span>Đây là bài <strong>dictation</strong>: nghe rồi gõ lại chính xác, không chỉ chọn đáp án.</span></div>
          <CompleteButton index={2} done={completed[2]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 3) {
      if (!(day.shadowingSentences?.length)) return <div className="step-content"><div className="section-kicker">04 / SOURCE STATUS</div><div className="source-gap"><h3>Chưa có câu Shadowing trong nguồn.</h3><p>Video BÀI HỌC chưa có transcript được xác minh nên không tự đặt câu nói thay thế.</p></div><CompleteButton index={3} done={completed[3]} onComplete={completeStep} /></div>;
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
              {shadowFeedback === "error" && "Chưa nhận được câu nói. Kiểm tra micro rồi thử lại."}{(shadowFeedback === "unsupported" || shadowFeedback === "error") && <button className="text-action" type="button" onClick={confirmShadowFallback}>Tự xác nhận đã luyện câu này</button>}
              {audioRecording === "denied" && "Micro bị từ chối. Hãy cho phép quyền micro trong cài đặt trình duyệt rồi thử lại."}
              {audioRecording === "unsupported" && "Trình duyệt chưa hỗ trợ MediaRecorder hoặc không cấp được micro."}
              {audioRecording === "error" && "Ghi âm chưa thành công. Kiểm tra micro rồi thử lại."}
            </div>
            {shadowTranscript && <div className="transcript-line"><span>Máy nghe được:</span> “{shadowTranscript}”</div>}
            {audioUrl && <div className="recording-review"><span className="tiny-label">BẢN GHI TẠM / CÂU {shadowIndex + 1}</span><div className="recording-actions"><audio controls src={audioUrl} aria-label="Nghe lại giọng bạn" /><button className="text-action" onClick={() => speak(currentSentence)}>Nghe giọng mẫu</button><button className="text-action" onClick={keepBestRecording}>Giữ bản tốt nhất</button></div>{bestAudioUrls[shadowIndex] === audioUrl && <small>Đã giữ bản này cho câu hiện tại.</small>}</div>}
          </div>
          <div className="sentence-switcher"><button className="circle-button" aria-label="Câu trước" onClick={() => changeShadowSentence((shadowIndex + Math.max((day.shadowingSentences?.length ?? 1) - 1, 0)) % Math.max(day.shadowingSentences?.length ?? 1, 1))}><ChevronLeft size={18} /></button><div className="dot-row">{(day.shadowingSentences ?? []).map((sentence, index) => <button aria-label={`Chọn câu ${index + 1}${shadowPassed[index] ? " — đã đạt" : ""}`} className={`${index === shadowIndex ? "active" : ""} ${shadowPassed[index] ? "passed" : ""}`} key={sentence} onClick={() => changeShadowSentence(index)} />)}</div><button className="circle-button" aria-label="Câu tiếp" onClick={() => changeShadowSentence((shadowIndex + 1) % Math.max(day.shadowingSentences?.length ?? 1, 1))}><ChevronRight size={18} /></button></div>
          <div className="shadow-progress" aria-live="polite"><strong>{shadowPassed.slice(0, 3).filter(Boolean).length}/3 câu đã có bằng chứng</strong><span>{shadowPassed.slice(0, 3).every(Boolean) ? "Đủ điều kiện đánh dấu bước." : "Hãy so khớp giọng nói hoặc giữ bản ghi tốt nhất cho từng câu."}</span></div>
          <CompleteButton index={3} done={completed[3]} onComplete={completeStep} />
        </div>
      );
    }

    if (activeStep === 4) {
      if (!(day.writingPrompts?.length)) return <div className="step-content"><div className="section-kicker">05 / SOURCE STATUS</div><div className="source-gap"><h3>Chưa có prompt viết trong nguồn.</h3><p>Tài liệu gốc không có phần writing theo schema hiện có; không tự bổ sung prompt tương đương.</p></div><CompleteButton index={4} done={completed[4]} onComplete={completeStep} /></div>;
      return (
        <div className="step-content">
          <div className="section-kicker">05 / MAKE IT YOURS</div>
          <div className="content-heading-row"><div><h3>Viết câu mới, không chép lại.</h3><p>Phản hồi kiểm tra cấu trúc và từ khóa của riêng Ngày {String(day.day).padStart(2, "0")}; hãy đối chiếu mục tiêu, lỗi thường gặp và mẫu nguồn.</p><div className="writing-rules"><span className="tiny-label">RULE CARD / {String(day.day).padStart(2, "0")}</span>{(day.writingRules ?? []).map((rule) => <span key={rule}>{rule}</span>)}</div></div><span className="page-number">2 prompts</span></div>
          <div className="writing-list">
            {(day.writingPrompts ?? []).map((prompt, index) => (
              <div className="writing-item" key={prompt}><div className="writing-prompt"><span className="item-index">0{index + 1}</span><span>{prompt}</span></div><textarea aria-label={prompt} value={writingAnswers[index] ?? ""} onChange={(event) => { setWritingAnswers((current) => ({ ...current, [index]: event.target.value })); setWritingFeedback((current) => ({ ...current, [index]: "ready" })); setWritingMessages((current) => ({ ...current, [index]: "" })); }} placeholder="Write your sentence here…" rows={2} /><div className="writing-footer"><span className={`writing-hint hint-${writingFeedback[index] ?? "ready"}`}>{writingFeedback[index] === "good" ? <><Check size={15} /> {writingMessages[index] || "Câu đạt yêu cầu."}</> : writingFeedback[index] === "revise" ? (writingMessages[index] || "Kiểm tra cấu trúc và từ khóa của bài.") : "Phản hồi sẽ xuất hiện ngay tại đây."}</span><button className="text-action" onClick={() => checkWriting(index)}>Kiểm tra câu</button></div></div>
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
        {day.quiz?.length ? <QuizRenderer items={day.quiz} onSubmit={({ score, total }) => { setQuizScore(score); announce(`Đã chấm: ${score}/${total} câu đúng.`); }} /> : <div className="source-gap"><h3>Chưa có quiz tương thích trong nguồn đã trích xuất.</h3><p>Đáp án gốc đang ở dạng bài điền/viết hoặc chưa có link tương ứng; không tự chuyển thành câu hỏi trắc nghiệm.</p></div>}
        {day.day === 13 && !day.grammarContent && <div className="source-gap srs-source-note"><h3>Ghi chú trước khi ôn thẻ.</h3><p>Các thẻ dưới đây được suy luận có căn cứ từ bài thi gốc; Ngày 13 chưa có phần bài giảng lý thuyết đầy đủ để làm nguồn Input. Hãy xem <strong>ghi chú nguồn</strong> trước khi chuyển sang bước Output.</p></div>}
        <div className="flashcard-block"><div className="flashcard-heading"><div><div className="section-kicker">SRS / FLASHCARD {cardIndex + 1}/{day.srsCards?.length ?? 0}</div><h4>Một thẻ, một lần nhớ có chủ đích.</h4></div><span className="interval-label">Ôn sau {cardStates[cardIndex]?.interval ?? 1} ngày</span></div>{currentCard && <button className={`flashcard ${cardFlipped ? "is-flipped" : ""}`} onClick={() => setCardFlipped((flipped) => !flipped)} aria-label="Lật flashcard"><span className="flashcard-face flashcard-front"><span className="tiny-label">MẶT TRƯỚC</span><strong>{currentCard.front}</strong><span className="flip-hint">Chạm để lật thẻ</span></span><span className="flashcard-face flashcard-back"><span className="tiny-label">MẶT SAU</span><strong>{currentCard.back}</strong><span className="flip-hint">Chạm để xem mặt trước</span></span></button>}{cardFlipped && <div className="flashcard-actions"><button className="remember-action" onClick={() => rateCard(false)}>Chưa nhớ</button><button className="primary-action" onClick={() => rateCard(true)}><Check size={16} /> Nhớ</button></div>}</div>
        <CompleteButton index={5} done={completed[5]} onComplete={completeStep} />
      </div>
    );
  }

  const roadmapProgress = readRoadmapProgress();
  const isBlockedRoute = !roadmapProgress.completedDays.includes(day.day) && !isDayReady(day.day, roadmapProgress.completedDays);
  if (isBlockedRoute) {
    return <LockedLesson day={day.day} title={day.title} previousDay={Math.max(day.day - 1, 1)} />;
  }
  if (!hasLessonBlocks(day)) {
    return <IncompleteLesson day={day.day} title={day.title} sourceNote={day.sourceNote} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="48 Ngày Lấy Gốc Tiếng Anh"><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></a>
        <nav className={`topnav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Điều hướng chính"><a href="#lesson" onClick={() => setMobileMenuOpen(false)}>Bài học</a><a href={routePath("/lo-trinh")} onClick={() => setMobileMenuOpen(false)}>Lịch 48 ngày</a><a href={routePath("/lo-trinh#principles")} onClick={() => setMobileMenuOpen(false)}>Phương pháp</a><a href={routePath("/quiz-lab")} onClick={() => setMobileMenuOpen(false)}>Phòng quiz</a></nav>
        <div className="topbar-actions"><span className="streak"><Sparkles size={15} /> 01 ngày liên tiếp</span><button className="menu-toggle" aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> DAY {String(day.day).padStart(2, "0")} / {day.level}</div><h1>48 ngày để<br /><em>xây lại</em> nền tảng.</h1><p className="hero-lede">Một workbook tương tác giúp bạn học lại tiếng Anh bằng tai, bằng miệng, bằng tay — từng bước nhỏ nhưng có thể nhìn thấy.</p><div className="hero-actions"><a className="primary-action hero-cta" href="#lesson">Bắt đầu bài học <ArrowRight size={18} /></a><a className="secondary-action" href={routePath("/lo-trinh#principles")}>Xem cách học <CircleHelp size={16} /></a></div><div className="hero-footnote"><span>{String(day.day).padStart(2, "0")}</span><span>{day.title}</span><span className="footnote-rule" /><span>15–20 phút</span></div></div>
            <div className="hero-visual"><img src={assetPath("/assets/english-workbook-hero.jpg")} alt="Bàn học với workbook tiếng Anh và các nhãn nghe, nói, đọc, viết" /><div className="visual-note note-top"><span>HEAR IT</span><Volume2 size={16} /></div><div className="visual-note note-bottom"><span>MAKE A MARK</span><Check size={15} /></div></div>
          </div>
          <div className="hero-progress"><div className="progress-copy"><span className="tiny-label">TIẾN TRÌNH NGÀY {String(day.day).padStart(2, "0")}</span><strong>{completedCount} / 6 bước đã XONG</strong><span className="progress-sequence">01 NGHE · 02 HỌC · 03 NGHE · 04 NÓI · 05 VIẾT · 06 ÔN</span></div><div className="progress-track"><span style={{ width: `${Math.max(progressPercent, 4)}%` }} /></div><span className="progress-value">{progressPercent}%</span></div>
        </section>

        <section className="study-shell" id="lesson">
          <aside className="step-rail" aria-label={`Các bước trong Ngày ${day.day}`}><div className="rail-title"><span className="tiny-label">TODAY'S SEQUENCE</span><strong>06 bước<br />một mạch.</strong></div><div className="rail-steps">{stepLabels.map((label, index) => { const Icon = stepIcons[index]; const locked = index > 0 && !completed[index - 1]; return <button className={`rail-step ${activeStep === index ? "active" : ""} ${completed[index] ? "done" : ""} ${locked ? "locked" : ""}`} key={label} onClick={() => activateStep(index)} aria-current={activeStep === index ? "step" : undefined}><span className="rail-step-number">{completed[index] ? <Check size={14} /> : locked ? <Lock size={13} /> : `0${index + 1}`}</span><span className="rail-step-copy"><strong>{label}</strong><small>{stepSkills[index]}</small></span>{completed[index] && <span className="done-stamp">XONG</span>}</button>; })}</div><div className="rail-note"><Pencil size={16} /><span>Input trước.<br />Output sau.</span></div></aside>
          <div className="study-canvas" id="lesson-canvas"><div className="canvas-header"><div><div className="eyebrow"><span className="eyebrow-dot" /> BÀI HỌC TƯƠNG TÁC</div><h2>{day.title}</h2><p>Hôm nay bạn không học thuộc một công thức. Bạn sẽ nghe nó, nhìn nó, nói nó và tự viết một câu của mình.</p></div><div className="canvas-meta"><span className="day-label">DAY<br /><strong>{String(day.day).padStart(2, "0")}</strong></span><span className="source-code">{day.projectPhase ?? "CORE"}<br />GRAMMAR</span></div></div><div className="perforation" /><div className="canvas-margin-note"><span className="margin-note-index">MARGIN NOTE / {String(day.day).padStart(2, "0")}</span><strong>{day.title}</strong><span className="margin-note-rule" /><span className="margin-note-status">SOURCE-CHECKED LESSON</span></div><section className="lesson-brief" aria-label="Hồ sơ bài học"><div><span className="tiny-label">OBJECTIVES / {day.estimatedMinutes ?? 25} PHÚT</span><ul>{(day.learningObjectives ?? []).map((objective) => <li key={objective}>{objective}</li>)}</ul></div><div><span className="tiny-label">BRIDGE FROM DAY {String(Math.max(day.day - 1, 1)).padStart(2, "0")}</span><p>{day.bridgeFromPreviousDay}</p><p><strong>Cần có:</strong> {day.prerequisites}</p></div><div><span className="tiny-label">MASTERY NOTE</span><p>{day.masteryCriteria}</p><p><strong>Phát âm:</strong> {day.pronunciationFocus}</p><p><strong>Có thể làm:</strong> {day.canDoOutcome}</p>{day.rubric?.length ? <div className="lesson-rubric"><strong>RUBRIC / TỰ CHẤM</strong>{day.rubric.map((criterion) => <span key={criterion}>□ {criterion}</span>)}</div> : null}<p><strong>Lỗi cần tránh:</strong> {(day.commonMistakes ?? []).join(" · ")}</p></div></section><div className="mobile-step-strip">{stepLabels.map((label, index) => <button className={`${activeStep === index ? "active" : ""} ${completed[index] ? "done" : ""}`} key={label} onClick={() => activateStep(index)}>{completed[index] ? <Check size={14} /> : `0${index + 1}`}<span>{label}</span></button>)}</div><div className="step-panel">{renderStepContent()}</div><div className="source-strip"><span className="source-dot" /><span><strong>{day.contentOrigin === "workbook-authored" ? "WORKBOOK-AUTHORED" : day.contentOrigin === "mixed" ? "MIXED SOURCE" : "SOURCE-EXTRACTED"}</strong> · {day.sourceNote}</span><a href={daysData.sourceUrl} target="_blank" rel="noreferrer">Mở nguồn gốc <ArrowRight size={14} /></a></div></div>
        </section>

        <section className="lesson-context" aria-label="Ngữ cảnh workbook"><div><span className="section-kicker">INPUT → OUTPUT → RETURN</span><strong>Học theo đúng nhịp của ngày {String(day.day).padStart(2, "0")}.</strong></div><div className="context-rule" /><a className="secondary-action" href={routePath("/lo-trinh")}>Mở bản đồ 48 ngày <ArrowRight size={16} /></a><a className="secondary-action" href={routePath("/lo-trinh#principles")}>Xem phương pháp <CircleHelp size={16} /></a></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><p>Build the habit. Keep the mark.</p><span className="footer-note">Lưu tiến trình trên thiết bị này · {completedCount}/6 bước</span></footer>
      {notice && <div className="toast-notice" role="status"><Sparkles size={16} /> {notice}</div>}
    </div>
  );
}

function LockedLesson({ day, title, previousDay }: { day: number; title: string; previousDay: number }) {
  const steps = ["Nghe", "Học", "Nghe", "Nói", "Viết", "Ôn"];
  return <div className="app-shell lesson-gate"><header className="topbar"><a className="brand" href={routePath("/")}><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></a><span className="gate-header-note">WORKBOOK / ROUTE {String(day).padStart(2, "0")}—48</span></header><main className="gate-main"><div className="gate-route-strip"><span>ROUTE MARKER</span><i />{Array.from({ length: 6 }, (_, index) => <b key={index} className={index === 0 ? "is-current" : ""}>{String(index + 1).padStart(2, "0")}</b>)}</div><span className="eyebrow"><span className="eyebrow-dot" /> DAY {String(day).padStart(2, "0")} / LOCKED</span><h1>Để lại dấu ở<br /><em>Ngày {String(previousDay).padStart(2, "0")}</em> trước.</h1><p>“{title}” đã có trong sổ tay, nhưng trạm này chỉ mở khi ngày liền trước được hoàn thành đủ sáu bước.</p><div className="gate-dependency"><span className="tiny-label">DEPENDENCY / PREVIOUS PAGE</span><strong>Ngày {String(previousDay).padStart(2, "0")} → đủ 06 bước → mở Ngày {String(day).padStart(2, "0")}</strong><div className="gate-steps">{steps.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>)}</div></div><div className="gate-perforation" /><a className="primary-action" href={routePath("/lo-trinh")}>Về lộ trình <ArrowLeft size={17} /></a></main></div>;
}

function IncompleteLesson({ day, title, sourceNote }: { day: number; title: string; sourceNote?: string }) {
  return <div className="app-shell lesson-gate"><header className="topbar"><a className="brand" href={routePath("/")}><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></a></header><main className="gate-main"><span className="eyebrow"><span className="eyebrow-dot" /> DAY {String(day).padStart(2, "0")} / SOURCE STATUS</span><h1>Trang này đang<br /><em>được hoàn thiện.</em></h1><p>{title} chưa đủ sáu khối học để mở theo tiến trình. Nội dung được giữ nguyên trạng để không làm sai dữ liệu nguồn.</p>{sourceNote && <blockquote>{sourceNote}</blockquote>}<a className="secondary-action" href={routePath("/lo-trinh")}>Về lộ trình <ArrowLeft size={17} /></a></main></div>;
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
