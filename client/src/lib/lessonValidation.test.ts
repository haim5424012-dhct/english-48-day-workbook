import { describe, expect, it } from "vitest";
import { canCompleteDay, canCompleteStep, hasLessonBlocks, isShadowingTranscriptCorrect, setShadowingSentenceResult, type CompletionEvidence, type LessonLike } from "./lessonValidation";
import { isListeningAnswerCorrect } from "../pages/Home";

const day: LessonLike = {
  day: 1,
  title: "Test lesson",
  warmupScript: "I am ready.",
  grammarContent: "<p>Rule</p>",
  listeningItems: [{}, {}, {}],
  shadowingSentences: ["One", "Two", "Three"],
  writingPrompts: ["One", "Two"],
  quiz: [{}, {}, {}, {}, {}],
  srsCards: [{}, {}, {}, {}, {}],
};

const evidence: CompletionEvidence = {
  listeningCorrect: 3,
  shadowingPassed: [true, true, true],
  writingGood: 2,
  quizScore: 4,
  reviewedCards: 5,
};

describe("dictation answer grading", () => {
  const item = { audioText: "I am ready.", blankSentence: "I ___ ready.", answer: "am" };

  it("counts the blank answer and full-sentence transcription as correct", () => {
    expect(isListeningAnswerCorrect(item, "am")).toBe(true);
    expect(isListeningAnswerCorrect(item, "I am ready.")).toBe(true);
    expect(isListeningAnswerCorrect(item, "I am ready")).toBe(true);
  });

  it("rejects an incorrect transcription", () => {
    expect(isListeningAnswerCorrect(item, "is")).toBe(false);
    expect(isListeningAnswerCorrect(item, "I is ready.")).toBe(false);
  });
});

describe("shadowing transcript grading", () => {
  const sentences = ["I am ready.", "She is at home.", "They are not late."];

  it("accepts all three exact sentences with natural casing and punctuation differences", () => {
    expect(isShadowingTranscriptCorrect(sentences[0], "i am ready")).toBe(true);
    expect(isShadowingTranscriptCorrect(sentences[1], "She is at home.")).toBe(true);
    expect(isShadowingTranscriptCorrect(sentences[2], "they are not late")).toBe(true);
  });

  it("rejects a materially different sentence", () => {
    expect(isShadowingTranscriptCorrect(sentences[2], "I are not late")).toBe(false);
  });

  it("preserves passed results when moving between sentence cards", () => {
    let passed = [false, false, false];
    passed = setShadowingSentenceResult(passed, 0, true);
    passed = setShadowingSentenceResult(passed, 1, true);
    passed = setShadowingSentenceResult(passed, 2, true);
    expect(passed).toEqual([true, true, true]);
  });

  it("allows step completion only after all three sentence results pass", () => {
    expect(canCompleteStep(3, day, { ...evidence, shadowingPassed: [true, true, false] })).toBe(false);
    expect(canCompleteStep(3, day, { ...evidence, shadowingPassed: [true, true, true] })).toBe(true);
  });
});

describe("lesson completion rules", () => {
  it("requires all six content blocks", () => {
    expect(hasLessonBlocks(day)).toBe(true);
    expect(hasLessonBlocks({ ...day, quiz: [] })).toBe(false);
  });

  it("requires minimum evidence for each output step", () => {
    expect(canCompleteStep(2, day, { ...evidence, listeningCorrect: 2 })).toBe(false);
    expect(canCompleteStep(3, day, { ...evidence, shadowingPassed: [true, false, true] })).toBe(false);
    expect(canCompleteStep(4, day, { ...evidence, writingGood: 1 })).toBe(false);
    expect(canCompleteStep(5, day, { ...evidence, quizScore: 3 })).toBe(false);
    expect(canCompleteStep(5, day, { ...evidence, reviewedCards: 4 })).toBe(false);
  });

  it("accepts a fully evidenced day and rejects partial completion", () => {
    expect(canCompleteDay(day, [true, true, true, true, true, true], evidence)).toBe(true);
    expect(canCompleteDay(day, [true, true, true, true, true, false], evidence)).toBe(false);
  });
});
