const MS_PER_DAY = 86_400_000;
const DAYS_PER_WEEK = 7;

export function computeCurrentWeek(weekStart: string, now: Date = new Date()): number {
  const start = new Date(`${weekStart}T00:00:00`).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = Math.floor((today - start) / MS_PER_DAY);
  return Math.max(1, Math.floor(diffDays / DAYS_PER_WEEK) + 1);
}
