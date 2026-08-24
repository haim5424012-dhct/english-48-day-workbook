import { readFile } from "node:fs/promises";

const root = JSON.parse(await readFile(new URL("../data/days.json", import.meta.url), "utf8"));
const client = JSON.parse(await readFile(new URL("../client/src/data/days.json", import.meta.url), "utf8"));
const curriculum = JSON.parse(await readFile(new URL("../data/curriculum-map.json", import.meta.url), "utf8"));
const curriculumClient = JSON.parse(await readFile(new URL("../client/src/data/curriculum-map.json", import.meta.url), "utf8"));
const days = root.days;
const requiredKeys = [
  "day", "title", "level", "status", "sourceNote", "warmupScript", "grammarContent",
  "listeningItems", "shadowingSentences", "writingPrompts", "quiz", "srsCards",
  "learningObjectives", "prerequisites", "bridgeFromPreviousDay", "commonMistakes",
  "masteryCriteria", "estimatedMinutes", "contentOrigin", "pronunciationFocus", "writingRules", "writingKeywords",
  "introduces", "reinforces", "preparesFor", "retrievalFromDays", "canDoOutcome",
];
const quizTypes = new Set(["multiple-choice", "fill-blank", "transformation", "matching", "short-answer"]);
const fail = (message) => { throw new Error(message); };
const allQuizIds = new Set();
const allExplanations = new Set();
const forbidden = [/phù hợp nhất với mục tiêu/i, /day-question-/i, /This sentence needs another structure/i, /yesterday\.$/i, /Đáp án này là ví dụ luyện tập/i, /Quan sát chủ ngữ, động từ và từ chỉ thời gian/i];

if (!Array.isArray(days) || days.length !== 48) fail(`Expected exactly 48 day objects, received ${days?.length ?? 0}`);
if (JSON.stringify(root) !== JSON.stringify(client)) fail("Root and client days.json must be identical");
if (JSON.stringify(curriculum) !== JSON.stringify(curriculumClient)) fail("Root and client curriculum-map.json must be identical");
if (!Array.isArray(curriculum.days) || curriculum.days.length !== 48) fail("Curriculum map must contain exactly 48 day nodes");
const numbers = days.map((entry) => entry.day);
if (new Set(numbers).size !== 48 || numbers.some((number, index) => number !== index + 1)) fail("Day numbers must be unique and run from 1 to 48");

for (const [index, day] of days.entries()) {
  const label = `Day ${index + 1}`;
  for (const key of requiredKeys) if (!(key in day)) fail(`${label} missing required key: ${key}`);
  if (!day.title.trim() || !day.sourceNote.trim()) fail(`${label} needs non-empty title and traceable sourceNote`);
  const mapDay = curriculum.days[index];
  if (mapDay?.day !== day.day || mapDay.title !== day.title || mapDay.canDoOutcome !== day.canDoOutcome) fail(`${label} curriculum map is out of sync`);
  if (!Array.isArray(day.commonMistakes) || day.commonMistakes.length < 2 || day.commonMistakes.length > 3 || new Set(day.commonMistakes).size !== day.commonMistakes.length) fail(`${label} needs 2-3 distinct commonMistakes`);
  if (!Array.isArray(day.writingRules) || day.writingRules.length < 3 || !Array.isArray(day.writingKeywords) || day.writingKeywords.length < 1) fail(`${label} needs specific writing rules and keywords`);
  if (!Array.isArray(day.introduces) || !day.introduces.length || !Array.isArray(day.reinforces) || !day.reinforces.length || !Array.isArray(day.preparesFor) || !day.preparesFor.length || !Array.isArray(day.retrievalFromDays) || !day.retrievalFromDays.length || !day.canDoOutcome.trim()) fail(`${label} needs complete curriculum links`);
  for (const pattern of forbidden) if (pattern.test(JSON.stringify(day))) fail(`${label} contains forbidden generic/template content: ${pattern}`);
  if (!day.warmupScript.trim() || !day.grammarContent.trim()) fail(`${label} needs warmupScript and grammarContent`);
  if (!Array.isArray(day.learningObjectives) || day.learningObjectives.length < 3) fail(`${label} needs at least 3 learningObjectives`);
  if (!day.prerequisites.trim() || !day.bridgeFromPreviousDay.trim() || !day.masteryCriteria.trim()) fail(`${label} needs prerequisite, bridge and mastery criteria`);
  if (!Number.isInteger(day.estimatedMinutes) || day.estimatedMinutes < 10) fail(`${label} needs a realistic estimatedMinutes value`);
  if (!new Set(["source-extracted", "workbook-authored", "mixed"]).has(day.contentOrigin)) fail(`${label} has invalid contentOrigin`);
  if (!Array.isArray(day.listeningItems) || day.listeningItems.length < 3) fail(`${label} needs at least 3 listeningItems`);
  for (const [itemIndex, item] of day.listeningItems.entries()) {
    if (item.blankSentence.trim().startsWith("___ ") && itemIndex < 2) fail(`${label} listening item ${itemIndex + 1} must not always blank only the first word`);
    if (!item.audioText?.trim() || !item.blankSentence?.includes("___") || !item.answer?.trim()) fail(`${label} listening item ${itemIndex + 1} is incomplete`);
  }
  if (!Array.isArray(day.shadowingSentences) || day.shadowingSentences.length < 3 || day.shadowingSentences.some((sentence) => !sentence.trim())) fail(`${label} needs 3 non-empty shadowingSentences`);
  if (!Array.isArray(day.writingPrompts) || day.writingPrompts.length < 2 || day.writingPrompts.some((prompt) => !prompt.trim())) fail(`${label} needs 2 non-empty writingPrompts`);
  if (!Array.isArray(day.srsCards) || day.srsCards.length < 5 || day.srsCards.some((card) => !card.front?.trim() || !card.back?.trim())) fail(`${label} needs 5 complete srsCards`);
  if (!Array.isArray(day.quiz) || day.quiz.length < 5) fail(`${label} needs at least 5 quiz items`);
  const dayTypes = new Set(day.quiz.map((item) => item.type));
  for (const requiredType of quizTypes) if (!dayTypes.has(requiredType)) fail(`${label} must use quiz type ${requiredType}`);
  const dayCorrectIndexes = [];
  for (const [quizIndex, item] of day.quiz.entries()) {
    if (!quizTypes.has(item.type)) fail(`${label} quiz ${quizIndex + 1} has unsupported type ${item.type}`);
    if (!item.id || !/^day-\d+-q-\d{2}$/.test(item.id) || allQuizIds.has(item.id)) fail(`${label} quiz ${quizIndex + 1} needs a unique id like day-12-q-03`);
    allQuizIds.add(item.id);
    if (!item.explanation?.trim() || allExplanations.has(item.explanation)) fail(`${label} quiz ${quizIndex + 1} needs a specific unique explanation`);
    allExplanations.add(item.explanation);
    if (item.type === "multiple-choice") dayCorrectIndexes.push(item.correctIndex);
    if (item.type === "multiple-choice" && (!Array.isArray(item.options) || item.options.length < 2 || !Number.isInteger(item.correctIndex) || item.correctIndex < 0 || item.correctIndex >= item.options.length)) fail(`${label} quiz ${quizIndex + 1} has invalid multiple-choice data`);
    if (item.type === "fill-blank" && (!item.sentence?.includes("___") || !Array.isArray(item.blanks) || item.blanks.length < 1)) fail(`${label} quiz ${quizIndex + 1} has invalid fill-blank data`);
    if (item.type === "transformation" && (!item.sourceSentence?.trim() || !Array.isArray(item.acceptedAnswers) || !item.acceptedAnswers.length)) fail(`${label} quiz ${quizIndex + 1} has invalid transformation data`);
    if (item.type === "matching" && (!Array.isArray(item.leftItems) || !Array.isArray(item.rightItems) || !Array.isArray(item.correctMatches) || item.leftItems.length !== item.correctMatches.length || new Set(item.correctMatches).size !== item.correctMatches.length || item.correctMatches.every((match, index) => match === index))) fail(`${label} quiz ${quizIndex + 1} has invalid or position-only matching data`);
    if (item.type === "short-answer" && (!item.prompt?.trim() || !Array.isArray(item.acceptedAnswers) || !item.acceptedAnswers.length)) fail(`${label} quiz ${quizIndex + 1} has invalid short-answer data`);
  }
  if (dayCorrectIndexes.length && new Set(dayCorrectIndexes).size < Math.min(3, dayCorrectIndexes.length)) fail(`${label} multiple-choice answers are not distributed across options`);
}

if (allQuizIds.size !== 240) fail(`Expected 240 unique quiz IDs, received ${allQuizIds.size}`);
if (new Set(days.map((day) => day.estimatedMinutes)).size < 3) fail("estimatedMinutes must vary across the curriculum");

console.log(`Content quality check passed: ${days.length}/48 days, ${allQuizIds.size} unique quiz items, five formats used per day.`);
