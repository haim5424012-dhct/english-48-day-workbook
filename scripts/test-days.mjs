import { readFile } from "node:fs/promises";

const source = JSON.parse(await readFile(new URL("../data/days.json", import.meta.url), "utf8"));
const days = source.days;
const requiredDayOneKeys = [
  "day",
  "title",
  "warmupScript",
  "grammarContent",
  "listeningItems",
  "shadowingSentences",
  "writingPrompts",
  "quiz",
  "srsCards",
];

if (!Array.isArray(days) || days.length !== 48) {
  throw new Error(`Expected exactly 48 day objects, received ${days?.length ?? 0}`);
}

const numbers = days.map((entry) => entry.day);
if (new Set(numbers).size !== 48 || numbers.some((number, index) => number !== index + 1)) {
  throw new Error("Day numbers must be unique and run from 1 to 48");
}

const dayOne = days.find((entry) => entry.day === 1);
for (const key of requiredDayOneKeys) {
  if (!dayOne?.[key]) throw new Error(`Day 1 is missing required key: ${key}`);
}

if (dayOne.listeningItems.length < 3 || dayOne.shadowingSentences.length < 3 || dayOne.quiz.length < 3 || dayOne.srsCards.length < 3) {
  throw new Error("Day 1 needs at least 3 listening items, shadowing sentences, quiz questions and SRS cards");
}

console.log(`Content check passed: ${days.length} day objects; Day 1 has all required learning blocks.`);
