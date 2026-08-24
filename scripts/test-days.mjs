import { readFile } from "node:fs/promises";

const root = JSON.parse(await readFile(new URL("../data/days.json", import.meta.url), "utf8"));
const client = JSON.parse(await readFile(new URL("../client/src/data/days.json", import.meta.url), "utf8"));
const days = root.days;
const requiredKeys = [
  "day", "title", "level", "status", "sourceNote", "warmupScript", "grammarContent",
  "listeningItems", "shadowingSentences", "writingPrompts", "quiz", "srsCards",
  "learningObjectives", "prerequisites", "bridgeFromPreviousDay", "commonMistakes",
  "masteryCriteria", "estimatedMinutes", "contentOrigin", "pronunciationFocus",
];
const quizTypes = new Set(["multiple-choice", "fill-blank", "transformation", "matching", "short-answer"]);
const fail = (message) => { throw new Error(message); };

if (!Array.isArray(days) || days.length !== 48) fail(`Expected exactly 48 day objects, received ${days?.length ?? 0}`);
if (JSON.stringify(root) !== JSON.stringify(client)) fail("Root and client days.json must be identical");
const numbers = days.map((entry) => entry.day);
if (new Set(numbers).size !== 48 || numbers.some((number, index) => number !== index + 1)) fail("Day numbers must be unique and run from 1 to 48");

for (const [index, day] of days.entries()) {
  const label = `Day ${index + 1}`;
  for (const key of requiredKeys) if (!(key in day)) fail(`${label} missing required key: ${key}`);
  if (!day.title.trim() || !day.sourceNote.trim()) fail(`${label} needs non-empty title and traceable sourceNote`);
  if (!day.warmupScript.trim() || !day.grammarContent.trim()) fail(`${label} needs warmupScript and grammarContent`);
  if (!Array.isArray(day.learningObjectives) || day.learningObjectives.length < 3) fail(`${label} needs at least 3 learningObjectives`);
  if (!day.prerequisites.trim() || !day.bridgeFromPreviousDay.trim() || !day.masteryCriteria.trim()) fail(`${label} needs prerequisite, bridge and mastery criteria`);
  if (!Number.isInteger(day.estimatedMinutes) || day.estimatedMinutes < 10) fail(`${label} needs a realistic estimatedMinutes value`);
  if (!new Set(["source-extracted", "workbook-authored", "mixed"]).has(day.contentOrigin)) fail(`${label} has invalid contentOrigin`);
  if (!Array.isArray(day.listeningItems) || day.listeningItems.length < 3) fail(`${label} needs at least 3 listeningItems`);
  for (const [itemIndex, item] of day.listeningItems.entries()) {
    if (!item.audioText?.trim() || !item.blankSentence?.includes("___") || !item.answer?.trim()) fail(`${label} listening item ${itemIndex + 1} is incomplete`);
  }
  if (!Array.isArray(day.shadowingSentences) || day.shadowingSentences.length < 3 || day.shadowingSentences.some((sentence) => !sentence.trim())) fail(`${label} needs 3 non-empty shadowingSentences`);
  if (!Array.isArray(day.writingPrompts) || day.writingPrompts.length < 2 || day.writingPrompts.some((prompt) => !prompt.trim())) fail(`${label} needs 2 non-empty writingPrompts`);
  if (!Array.isArray(day.srsCards) || day.srsCards.length < 5 || day.srsCards.some((card) => !card.front?.trim() || !card.back?.trim())) fail(`${label} needs 5 complete srsCards`);
  if (!Array.isArray(day.quiz) || day.quiz.length < 5) fail(`${label} needs at least 5 quiz items`);
  for (const [quizIndex, item] of day.quiz.entries()) {
    if (!quizTypes.has(item.type)) fail(`${label} quiz ${quizIndex + 1} has unsupported type ${item.type}`);
    if (item.type === "multiple-choice" && (!Array.isArray(item.options) || item.options.length < 2 || !Number.isInteger(item.correctIndex) || item.correctIndex < 0 || item.correctIndex >= item.options.length)) fail(`${label} quiz ${quizIndex + 1} has invalid multiple-choice data`);
    if (item.type === "fill-blank" && (!item.sentence?.includes("___") || !Array.isArray(item.blanks) || item.blanks.length < 1)) fail(`${label} quiz ${quizIndex + 1} has invalid fill-blank data`);
    if (item.type === "transformation" && (!item.sourceSentence?.trim() || !Array.isArray(item.acceptedAnswers) || !item.acceptedAnswers.length)) fail(`${label} quiz ${quizIndex + 1} has invalid transformation data`);
    if (item.type === "matching" && (!Array.isArray(item.leftItems) || !Array.isArray(item.rightItems) || !Array.isArray(item.correctMatches) || item.leftItems.length !== item.correctMatches.length)) fail(`${label} quiz ${quizIndex + 1} has invalid matching data`);
    if (item.type === "short-answer" && (!item.prompt?.trim() || !Array.isArray(item.acceptedAnswers) || !item.acceptedAnswers.length)) fail(`${label} quiz ${quizIndex + 1} has invalid short-answer data`);
  }
}

console.log(`Content check passed: ${days.length}/48 days have metadata and six complete learning blocks.`);
