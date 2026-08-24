import { readFile, writeFile } from "node:fs/promises";

const root = JSON.parse(await readFile(new URL("../data/days.json", import.meta.url), "utf8"));
const map = {
  version: "1.0-curriculum-map",
  title: "Curriculum map — 48 Ngày Lấy Gốc Tiếng Anh",
  note: "Bản đồ sư phạm của workbook; không tuyên bố là mục lục chính thức của tài liệu giáo viên.",
  days: root.days.map((day) => ({
    day: day.day,
    title: day.title,
    prerequisites: day.prerequisites ? day.prerequisites.split("; ").filter(Boolean) : [],
    introduces: day.introduces ?? [],
    reinforces: day.reinforces ?? [],
    preparesFor: day.preparesFor ?? [],
    retrievalFromDays: day.retrievalFromDays ?? [],
    canDoOutcome: day.canDoOutcome ?? "",
    projectPhase: day.projectPhase ?? null,
  })),
};
await writeFile(new URL("../data/curriculum-map.json", import.meta.url), JSON.stringify(map, null, 2) + "\n", "utf8");
console.log(`Curriculum map written for ${map.days.length} days.`);
