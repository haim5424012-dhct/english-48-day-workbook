/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * completion is an ink mark earned by evidence, never a decorative button.
 */

export type LessonLike = {
  day: number;
  title: string;
  warmupScript?: string;
  grammarContent?: string;
  listeningItems?: unknown[];
  shadowingSentences?: string[];
  writingPrompts?: string[];
  quiz?: unknown[];
  srsCards?: unknown[];
};

export function normalizeSpeechText(value: string) {
  return value
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isShadowingTranscriptCorrect(target: string, transcript: string, threshold = 0.8) {
  const targetWords = normalizeSpeechText(target).split(" ").filter(Boolean);
  const spokenWords = normalizeSpeechText(transcript).split(" ").filter(Boolean);
  if (!targetWords.length || !spokenWords.length) return false;
  if (targetWords.join(" ") === spokenWords.join(" ")) return true;
  const matched = targetWords.filter((word, index) => spokenWords[index] === word).length;
  return matched / targetWords.length >= threshold;
}

export function setShadowingSentenceResult(current: boolean[], index: number, passed: boolean) {
  return current.map((value, currentIndex) => currentIndex === index ? passed : value);
}

export type CompletionEvidence = {
  listeningCorrect: number;
  shadowingPassed: boolean[];
  writingGood: number;
  quizScore: number | null;
  reviewedCards: number;
};

export function hasLessonBlocks(day: LessonLike) {
  return Boolean(day.warmupScript?.trim())
    && Boolean(day.grammarContent?.trim())
    && (day.listeningItems?.length ?? 0) >= 3
    && (day.shadowingSentences?.length ?? 0) >= 3
    && (day.writingPrompts?.length ?? 0) >= 2
    && (day.quiz?.length ?? 0) >= 5
    && (day.srsCards?.length ?? 0) >= 5;
}

export function canCompleteStep(index: number, day: LessonLike, evidence: CompletionEvidence) {
  if (!hasLessonBlocks(day)) return false;
  if (index === 0) return Boolean(day.warmupScript?.trim());
  if (index === 1) return Boolean(day.grammarContent?.trim());
  if (index === 2) return evidence.listeningCorrect >= Math.min(day.listeningItems?.length ?? 0, 3);
  if (index === 3) return evidence.shadowingPassed.length >= 3 && evidence.shadowingPassed.slice(0, 3).every(Boolean);
  if (index === 4) return evidence.writingGood >= Math.min(day.writingPrompts?.length ?? 0, 2);
  if (index === 5) return (evidence.quizScore ?? -1) >= 4 && evidence.reviewedCards >= Math.min(day.srsCards?.length ?? 0, 5);
  return false;
}

export function canCompleteDay(day: LessonLike, completed: boolean[], evidence: CompletionEvidence) {
  return hasLessonBlocks(day) && completed.every(Boolean) && canCompleteStep(5, day, evidence);
}

export function contentStatus(day: LessonLike) {
  return hasLessonBlocks(day) ? "ready" : "needs-content";
}
