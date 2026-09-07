import { Fragment } from 'react';
import { DAYS, MORNING_COUNT } from '../constants';
import type { ScheduleData } from '../types';
import { ScheduleCell } from './schedule-cell';

export function ScheduleGrid({
  schedule,
  currentWeek,
  className,
}: {
  schedule: ScheduleData;
  currentWeek?: number;
  className?: string;
}) {
  const byCell = new Map(schedule.courses.map((c) => [c.day + ':' + c.period, c]));

  return (
    <div
      className={
        'grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(4,minmax(0,1fr))] gap-px bg-zinc-200 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800 h-full ' +
        (className ?? '')
      }
    >
      <div className="sticky top-0 bg-white dark:bg-zinc-900" />
      {DAYS.map((d) => (
        <div key={d.id} className="sticky top-0 bg-white font-medium dark:bg-zinc-900">
          {d.label}
        </div>
      ))}
      {schedule.periods.map((period, i) => {
        const divider = i === MORNING_COUNT ? ' border-t-2 border-zinc-400 dark:border-zinc-600' : '';
        return (
          <Fragment key={period.id}>
            <div className={'bg-white p-2 overflow-hidden dark:bg-zinc-900' + divider}>
              {i === 0 && (
                <span className="inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">上午</span>
              )}
              {i === MORNING_COUNT && (
                <span className="inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">下午</span>
              )}
              <p className="font-medium">{period.label}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{period.time}</p>
            </div>
            {DAYS.map((d) => (
              <div key={d.id} className={'bg-white p-2 overflow-hidden dark:bg-zinc-900' + divider}>
                <ScheduleCell course={byCell.get(d.id + ':' + period.id)} currentWeek={currentWeek} />
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
