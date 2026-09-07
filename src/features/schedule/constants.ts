import type { Day } from './types';

export const DAYS: Day[] = [
  { id: 'mon', label: '周一' }, { id: 'tue', label: '周二' }, { id: 'wed', label: '周三' },
  { id: 'thu', label: '周四' }, { id: 'fri', label: '周五' }, { id: 'sat', label: '周六' },
  { id: 'sun', label: '周日' },
];
export const DAY_IDS = DAYS.map((d) => d.id);
export const MORNING_COUNT = 2; // indices 0,1 => 上午; 2,3 => 下午
