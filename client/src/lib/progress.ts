/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * progress is a visible paper trail; keep completion truthful, local, and easy to inspect.
 */

export const ROADMAP_STORAGE_KEY = "english48-roadmap-progress";
export const DAY1_STORAGE_KEY = "english48-day1-progress";

export type MilestoneRecord = {
  day: number;
  completedAt: string | null;
};

export type RoadmapProgress = {
  version: 2;
  completedDays: number[];
  lastCompletedAt: string | null;
  streak: number;
  milestones: MilestoneRecord[];
};

const fallback: RoadmapProgress = { version: 2, completedDays: [], lastCompletedAt: null, streak: 0, milestones: [] };

export function readRoadmapProgress(): RoadmapProgress {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(ROADMAP_STORAGE_KEY);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved) as Partial<RoadmapProgress>;
    const completedDays = Array.isArray(parsed.completedDays) ? Array.from(new Set(parsed.completedDays.filter((day): day is number => Number.isInteger(day) && day >= 1 && day <= 48))).sort((a, b) => a - b) : [];
    const milestones = Array.isArray(parsed.milestones)
      ? parsed.milestones
        .filter((record) => Boolean(record) && typeof record === "object" && Number.isInteger(record.day))
        .filter((record) => Number(record.day) >= 1 && Number(record.day) <= 48 && completedDays.includes(Number(record.day)))
        .map((record) => ({ day: Number(record.day), completedAt: typeof record.completedAt === "string" ? record.completedAt : null }))
        .filter((record, index, records) => records.findIndex((candidate) => candidate.day === record.day) === index)
        .sort((a, b) => a.day - b.day)
      : completedDays.map((day) => ({ day, completedAt: null }));
    const migrated = {
      version: 2 as const,
      completedDays,
      lastCompletedAt: typeof parsed.lastCompletedAt === "string" ? parsed.lastCompletedAt : null,
      streak: Number.isInteger(parsed.streak) ? Math.max(0, Number(parsed.streak)) : 0,
      milestones,
    };
    if (parsed.version !== 2) window.localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return fallback;
  }
}

function dayDifference(from: string | null, to: string) {
  if (!from) return Infinity;
  const fromDate = new Date(`${from}T00:00:00`);
  const toDate = new Date(`${to}T00:00:00`);
  return Math.round((toDate.getTime() - fromDate.getTime()) / 86400000);
}

export function markDayComplete(day: number): RoadmapProgress {
  if (!Number.isInteger(day) || day < 1 || day > 48) return readRoadmapProgress();
  const current = readRoadmapProgress();
  if (day > 1 && !current.completedDays.includes(day - 1)) return current;
  const today = new Date().toISOString().slice(0, 10);
  const completedDays = Array.from(new Set([...current.completedDays, day])).sort((a, b) => a - b);
  const difference = dayDifference(current.lastCompletedAt, today);
  const streak = current.lastCompletedAt === today ? current.streak : difference === 1 ? current.streak + 1 : 1;
  const milestones = current.milestones.some((record) => record.day === day)
    ? current.milestones
    : [...current.milestones, { day, completedAt: today }].sort((a, b) => a.day - b.day);
  const next = { version: 2 as const, completedDays, lastCompletedAt: today, streak, milestones };
  window.localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function isDayReady(day: number, completedDays: number[]) {
  return day === 1 || completedDays.includes(day - 1);
}
