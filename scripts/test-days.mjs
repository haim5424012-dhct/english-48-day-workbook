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

if (!Array.isArray(dayOne.listeningItems) || !Array.isArray(dayOne.shadowingSentences) || !Array.isArray(dayOne.writingPrompts) || !Array.isArray(dayOne.quiz) || dayOne.srsCards.length < 3) {
  throw new Error("Day 1 must keep all learning arrays in schema and have at least 3 SRS cards");
}

for (const [index, day] of days.entries()) {
  const needsSourceNote = day.day <= 5 || day.status === "pending-source";
  if (needsSourceNote && (!day.sourceNote || typeof day.sourceNote !== "string")) {
    throw new Error(`Day ${index + 1} must include a traceable sourceNote`);
  }
}

console.log(`Content check passed: ${days.length} day objects; Day 1 has all required learning blocks.`);
