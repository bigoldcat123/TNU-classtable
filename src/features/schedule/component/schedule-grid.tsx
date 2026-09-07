import { Fragment } from 'react';
import { DAYS, MORNING_COUNT } from '../constants';
import type { ScheduleData } from '../types';
import { ScheduleCell } from './schedule-cell';

export function ScheduleGrid({ schedule, className }: { schedule: ScheduleData; className?: string }) {
  const byCell = new Map(schedule.courses.map((c) => [c.day + ':' + c.period, c]));

  return (
    <div
      className={
        'grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] gap-px bg-zinc-200 border border-zinc-200 ' +
        (className ?? '')
      }
    >
      <div className="sticky top-0 bg-white" />
      {DAYS.map((d) => (
        <div key={d.id} className="sticky top-0 bg-white font-medium">
          {d.label}
        </div>
      ))}
      {schedule.periods.map((period, i) => {
        const divider = i === MORNING_COUNT ? ' border-t-2 border-zinc-400' : '';
        return (
          <Fragment key={period.id}>
            <div className={'bg-white p-2' + divider}>
              {i === 0 && (
                <span className="inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600">上午</span>
              )}
              {i === MORNING_COUNT && (
                <span className="inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600">下午</span>
              )}
              <p className="font-medium">{period.label}</p>
              <p className="text-xs text-zinc-500">{period.time}</p>
            </div>
            {DAYS.map((d) => (
              <div key={d.id} className={'bg-white p-2 min-h-[4.5rem]' + divider}>
                <ScheduleCell course={byCell.get(d.id + ':' + period.id)} />
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
