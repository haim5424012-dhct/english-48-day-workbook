/*
 * SRS logic — one source of truth for lesson and review desk.
 * Dates use local calendar days so a card reviewed today is not due again today.
 */

export type SRSCardState = {
  interval: number;
  easeFactor: number;
  lastReviewedAt: string | null;
};

export const todayKey = () => new Date().toISOString().slice(0, 10);

export function initialSRSState(): SRSCardState {
  return { interval: 1, easeFactor: 2.5, lastReviewedAt: null };
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + Math.max(1, days));
  return date.toISOString().slice(0, 10);
}

function dayDelta(from: string, to: string) {
  return Math.round((new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86400000);
}

export function dueDate(state: SRSCardState, today = todayKey()) {
  return state.lastReviewedAt ? addDays(state.lastReviewedAt, state.interval) : addDays(today, state.interval);
}

export function isDue(state: SRSCardState, today = todayKey()) {
  return Boolean(state.lastReviewedAt) && dueDate(state, today) <= today;
}

export function lateness(state: SRSCardState, today = todayKey()) {
  if (!state.lastReviewedAt) return 0;
  return Math.max(0, dayDelta(dueDate(state, today), today));
}

export function rateSRS(state: SRSCardState, remembered: boolean, reviewedAt = todayKey()): SRSCardState {
  return remembered
    ? { interval: Math.max(1, Math.round(state.interval * state.easeFactor)), easeFactor: Math.min(2.8, state.easeFactor + 0.1), lastReviewedAt: reviewedAt }
    : { interval: 1, easeFactor: Math.max(1.8, state.easeFactor - 0.2), lastReviewedAt: reviewedAt };
}

export function readCardStates(day: number, count: number): SRSCardState[] {
  const fallback = Array.from({ length: count }, initialSRSState);
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(`english48-day${day}-progress`);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as { cardStates?: Partial<SRSCardState>[] };
    return fallback.map((base, index) => ({
      interval: Number(saved.cardStates?.[index]?.interval) || base.interval,
      easeFactor: Number(saved.cardStates?.[index]?.easeFactor) || base.easeFactor,
      lastReviewedAt: typeof saved.cardStates?.[index]?.lastReviewedAt === "string" ? saved.cardStates[index]?.lastReviewedAt ?? null : null,
    }));
  } catch {
    return fallback;
  }
}

export function writeCardStates(day: number, states: SRSCardState[]) {
  if (typeof window === "undefined") return;
  const key = `english48-day${day}-progress`;
  try {
    const raw = window.localStorage.getItem(key);
    const previous = raw ? JSON.parse(raw) as Record<string, unknown> : {};
    window.localStorage.setItem(key, JSON.stringify({ ...previous, cardStates: states }));
  } catch {
    // localStorage can be blocked in private browsing; lesson remains usable in memory.
  }
}
