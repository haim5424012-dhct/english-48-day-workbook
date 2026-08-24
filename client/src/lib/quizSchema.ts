/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * Schema is the paper form behind the exercise: explicit, source-friendly,
 * easy to scan, and tolerant of legacy multiple-choice cards.
 */

export type QuizType = "multiple-choice" | "fill-blank" | "transformation" | "matching" | "short-answer";

export type MultipleChoiceQuiz = {
  id?: string;
  type: "multiple-choice";
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type FillBlankQuiz = {
  id?: string;
  type: "fill-blank";
  prompt: string;
  sentence: string;
  blanks: {
    id?: string;
    acceptedAnswers: string[];
    answer?: string;
  }[];
  explanation?: string;
};

export type TransformationQuiz = {
  id?: string;
  type: "transformation";
  prompt: string;
  instruction?: string;
  sourceSentence: string;
  acceptedAnswers: string[];
  answer?: string;
  explanation?: string;
};

export type MatchingQuiz = {
  id?: string;
  type: "matching";
  prompt: string;
  leftItems: string[];
  rightItems: string[];
  correctMatches: number[];
  explanation?: string;
};

export type ShortAnswerQuiz = {
  id?: string;
  type: "short-answer";
  prompt: string;
  image?: {
    src: string;
    alt: string;
  };
  acceptedAnswers: string[];
  placeholder?: string;
  answer?: string;
  explanation?: string;
};

export type QuizItem = MultipleChoiceQuiz | FillBlankQuiz | TransformationQuiz | MatchingQuiz | ShortAnswerQuiz;

export type LegacyMultipleChoiceQuiz = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export function normalizeQuizItem(item: QuizItem | LegacyMultipleChoiceQuiz, index: number): QuizItem {
  if ("type" in item && item.type) return { ...item, id: item.id ?? `question-${index + 1}` };
  return {
    ...item,
    id: `question-${index + 1}`,
    type: "multiple-choice",
  };
}

export function normalizeQuizText(value: string) {
  return value
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesAcceptedAnswer(value: string, acceptedAnswers: string[]) {
  const actual = normalizeQuizText(value);
  return acceptedAnswers.some((answer) => normalizeQuizText(answer) === actual);
}
