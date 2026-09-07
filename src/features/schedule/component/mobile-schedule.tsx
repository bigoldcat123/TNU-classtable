'use client';

import { useState } from 'react';
import { DAYS, MORNING_COUNT } from '../constants';
import type { DayId, ScheduleData } from '../types';
import { ScheduleCell } from './schedule-cell';

const ID_BY_WEEKDAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export function MobileSchedule({
  schedule,
  currentWeek,
  className,
}: {
  schedule: ScheduleData;
  currentWeek?: number;
  className?: string;
}) {
  const [selectedDay, setSelectedDay] = useState<DayId>((ID_BY_WEEKDAY[new Date().getDay()] ?? 'mon') as DayId);
  const byCell = new Map(schedule.courses.map((c) => [c.day + ':' + c.period, c]));
  const morning = schedule.periods.slice(0, MORNING_COUNT);
  const afternoon = schedule.periods.slice(MORNING_COUNT);

  return (
    <div className={(className ?? '') + ' h-full flex flex-col overflow-hidden'}>
      <div className="flex gap-1 overflow-x-auto shrink-0">
        {DAYS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelectedDay(d.id)}
            aria-pressed={selectedDay === d.id}
            className={
              'rounded px-3 py-1.5 text-sm whitespace-nowrap ' +
              (selectedDay === d.id
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800')
            }
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 mt-2 flex flex-col gap-1 overflow-hidden">
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">上午</h3>
        {morning.map((p) => (
          <div key={p.id} className="flex-1 min-h-0 rounded-lg border border-zinc-200 p-2 overflow-hidden dark:border-zinc-700">
            <p className="font-medium text-sm">{p.label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.time}</p>
            <div className="mt-0.5">
              <ScheduleCell course={byCell.get(selectedDay + ':' + p.id)} currentWeek={currentWeek} />
            </div>
          </div>
        ))}
        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">下午</h3>
        {afternoon.map((p) => (
          <div key={p.id} className="flex-1 min-h-0 rounded-lg border border-zinc-200 p-2 overflow-hidden dark:border-zinc-700">
            <p className="font-medium text-sm">{p.label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.time}</p>
            <div className="mt-0.5">
              <ScheduleCell course={byCell.get(selectedDay + ':' + p.id)} currentWeek={currentWeek} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
