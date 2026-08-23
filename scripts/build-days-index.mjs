import { readFile, writeFile } from "node:fs/promises";

const source = JSON.parse(await readFile(new URL("../data/days.json", import.meta.url), "utf8"));
const stageForDay = (day) => {
  if (day <= 4) return 1;
  if (day <= 11) return 2;
  if (day <= 14) return 3;
  if (day <= 17) return 4;
  if (day <= 20) return 5;
  if (day <= 22) return 6;
  if (day <= 25) return 7;
  if (day <= 28) return 8;
  if (day <= 33) return 9;
  return 10;
};
const stageTitles = {
  1: "Nền tảng động từ TO BE",
  2: "Động từ thường & thì hiện tại",
  3: "Thì quá khứ",
  4: "Thì hiện tại hoàn thành & tương lai",
  5: "Ngữ âm — phát âm & trọng âm",
  6: "Luyện nghe số/tên + động từ khuyết thiếu",
  7: "Liên từ",
  8: "Câu điều kiện",
  9: "Luyện nghe chuyên đề",
  10: "Sắp cập nhật",
};

const index = source.days.map((entry) => ({
  day: entry.day,
  title: entry.day >= 34 ? "Sắp cập nhật" : entry.title,
  stage: stageForDay(entry.day),
  stageTitle: stageTitles[stageForDay(entry.day)],
  status: entry.day === 1 ? "ready" : entry.day >= 34 ? "pending-source" : "coming-soon",
}));

await writeFile(new URL("../data/days-index.json", import.meta.url), `${JSON.stringify(index, null, 2)}\n`);
console.log(`Roadmap index written: ${index.length} days across 10 stages.`);
