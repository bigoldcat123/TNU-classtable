import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { DAYS, DAY_IDS } from '../constants';
import { ScheduleError } from '../error';
import type { Course, DayId, Period, ScheduleData } from '../types';

export function parseSchedule(raw: unknown): ScheduleData {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new ScheduleError('schedule.json 顶层必须是对象');
  }
  const data = raw as { periods?: unknown; courses?: unknown };

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
    const c = item as { day?: unknown; period?: unknown; name?: unknown; teacher?: unknown; room?: unknown };
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
    return course;
  });

  return { days: DAYS, periods, courses };
}

export async function loadSchedule(): Promise<ScheduleData> {
  const filePath = path.join(process.cwd(), 'data', 'schedule.json');
  let text: string;
  try {
    text = await readFile(filePath, 'utf8');
  } catch (cause) {
    throw new ScheduleError('无法读取 data/schedule.json 文件', { cause });
  }
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (cause) {
    throw new ScheduleError('data/schedule.json 不是合法的 JSON', { cause });
  }
  return parseSchedule(raw);
}
