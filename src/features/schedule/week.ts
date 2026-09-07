const MS_PER_DAY = 86_400_000;
const DAYS_PER_WEEK = 7;
const WEEK_RANGE_RE = /第\s*(\d+)\s*-\s*(\d+)\s*周/;
const WEEK_SINGLE_RE = /第\s*(\d+)\s*周/;

export function computeCurrentWeek(weekStart: string, now: Date = new Date()): number {
  const start = new Date(`${weekStart}T00:00:00`).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = Math.floor((today - start) / MS_PER_DAY);
  return Math.max(1, Math.floor(diffDays / DAYS_PER_WEEK) + 1);
}

export function parseWeekRange(remark: string | undefined): { start: number; end: number } | null {
  if (!remark) return null;
  const range = WEEK_RANGE_RE.exec(remark);
  if (range) return { start: Number(range[1]), end: Number(range[2]) };
  const single = WEEK_SINGLE_RE.exec(remark);
  if (single) {
    const week = Number(single[1]);
    return { start: week, end: week };
  }
  return null;
}

export function isCourseInWeek(remark: string | undefined, currentWeek: number): boolean {
  const range = parseWeekRange(remark);
  return range === null || (currentWeek >= range.start && currentWeek <= range.end);
}
