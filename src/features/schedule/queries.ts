import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ScheduleError } from './error';
import { parseSchedule } from './service';
import type { ScheduleData } from './types';

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
