const MS_PER_DAY = 86_400_000;
const DAYS_PER_WEEK = 7;
const SEGMENT_RE = /^\d+$/;

export function computeCurrentWeek(weekStart: string, now: Date = new Date()): number {
  const start = new Date(`${weekStart}T00:00:00`).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = Math.floor((today - start) / MS_PER_DAY);
  return Math.max(1, Math.floor(diffDays / DAYS_PER_WEEK) + 1);
}

export interface WeekRange { start: number; end: number }

// 解析 weeks 字段（如 "2-9"、"3"、"2-9,11-13"）；无字段或格式非法返回 null
export function parseWeeks(weeks: string | undefined): WeekRange[] | null {
  if (!weeks) return null;
  const segments: WeekRange[] = [];
  for (const part of weeks.split(',')) {
    const [startText, endText] = part.split('-');
    if (!SEGMENT_RE.test(startText)) return null;
    const start = Number(startText);
    if (endText === undefined) {
      segments.push({ start, end: start });
    } else {
      if (!SEGMENT_RE.test(endText)) return null;
      const end = Number(endText);
      if (start > end) return null;
      segments.push({ start, end });
    }
  }
  return segments;
}

export function isCourseInWeek(weeks: string | undefined, currentWeek: number): boolean {
  const segments = parseWeeks(weeks);
  if (segments === null) return true; // 无 weeks 字段 -> 每周都有
  return segments.some(({ start, end }) => currentWeek >= start && currentWeek <= end);
}
