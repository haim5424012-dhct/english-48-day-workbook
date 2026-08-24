import { describe, expect, it } from "vitest";
import { canCompleteDay, canCompleteStep, hasLessonBlocks, type CompletionEvidence, type LessonLike } from "./lessonValidation";

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
