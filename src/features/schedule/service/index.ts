import { DAYS, DAY_IDS } from '../constants';
import { ScheduleError } from '../error';
import { parseWeeks } from '../week';
import type { Course, DayId, Period, ScheduleData } from '../types';

export function parseSchedule(raw: unknown): ScheduleData {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new ScheduleError('schedule.json 顶层必须是对象');
  }
  const data = raw as { weekStart?: unknown; periods?: unknown; courses?: unknown };

  const { weekStart } = data;
  if (typeof weekStart !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) {
    throw new ScheduleError('weekStart 必须是 YYYY-MM-DD 格式的日期');
  }

  if (!Array.isArray(data.periods) || data.periods.length !== 4) {
    throw new ScheduleError('periods 必须是恰好 4 节课（上午 2 节下午 2 节）');
  }

  const ids = new Set<string>();
  const periods: Period[] = data.periods.map((item, i) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new ScheduleError(`periods[${i}] 缺少有效的 id/label/time`);
    }
    const p = item as { id?: unknown; label?: unknown; time?: unknown };
    if (typeof p.id !== 'string' || p.id.length === 0 || typeof p.label !== 'string' || typeof p.time !== 'string') {
      throw new ScheduleError(`periods[${i}] 缺少有效的 id/label/time`);
    }
    if (ids.has(p.id)) {
      throw new ScheduleError(`periods 中存在重复的 id: ${p.id}`);
    }
    ids.add(p.id);
    return { id: p.id, label: p.label, time: p.time };
  });

  if (!Array.isArray(data.courses)) {
    throw new ScheduleError('courses 必须是数组');
  }

  const positions = new Set<string>();
  const courses: Course[] = data.courses.map((item, i) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new ScheduleError(`courses[${i}] 缺少 day/period/name`);
    }
    const c = item as { day?: unknown; period?: unknown; name?: unknown; teacher?: unknown; room?: unknown; weeks?: unknown; remark?: unknown };
    if (typeof c.day !== 'string' || !(DAY_IDS as readonly string[]).includes(c.day)) {
      throw new ScheduleError(`courses[${i}] 的 day 无效: ${c.day}`);
    }
    if (typeof c.period !== 'string' || !ids.has(c.period) || typeof c.name !== 'string' || c.name.length === 0) {
      throw new ScheduleError(`courses[${i}] 缺少 day/period/name`);
    }
    const key = `${c.day}:${c.period}`;
    if (positions.has(key)) {
      throw new ScheduleError(`courses 中存在重复的课程位置: ${c.day}/${c.period}`);
    }
    positions.add(key);

    const course: Course = { day: c.day as DayId, period: c.period, name: c.name };
    if (c.teacher !== undefined) {
      if (typeof c.teacher !== 'string') {
        throw new ScheduleError(`courses[${i}] 的 teacher 必须是字符串`);
      }
      course.teacher = c.teacher;
    }
    if (c.room !== undefined) {
      if (typeof c.room !== 'string') {
        throw new ScheduleError(`courses[${i}] 的 room 必须是字符串`);
      }
      course.room = c.room;
    }
    if (c.weeks !== undefined) {
      if (typeof c.weeks !== 'string' || parseWeeks(c.weeks) === null) {
        throw new ScheduleError(`courses[${i}] 的 weeks 无效: ${c.weeks}`);
      }
      course.weeks = c.weeks;
    }
    if (c.remark !== undefined) {
      if (typeof c.remark !== 'string') {
        throw new ScheduleError(`courses[${i}] 的 remark 必须是字符串`);
      }
      course.remark = c.remark;
    }
    return course;
  });

  return { weekStart, days: DAYS, periods, courses };
}
