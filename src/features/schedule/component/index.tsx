import { computeCurrentWeek } from '../week';
import { ScheduleGrid } from './schedule-grid';
import { MobileSchedule } from './mobile-schedule';
import { WeekBadge } from './week-badge';
import type { ScheduleData } from '../types';

export function ScheduleView({ schedule }: { schedule: ScheduleData }) {
  const currentWeek = computeCurrentWeek(schedule.weekStart);
  return (
    <main className="h-dvh flex flex-col w-full max-w-6xl mx-auto px-4 py-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <h1 className="text-2xl font-bold">课程表</h1>
        <WeekBadge weekStart={schedule.weekStart} initialWeek={currentWeek} />
      </div>
      <div className="flex-1 min-h-0">
        <ScheduleGrid schedule={schedule} currentWeek={currentWeek} className="hidden lg:grid h-full" />
        <MobileSchedule schedule={schedule} currentWeek={currentWeek} className="lg:hidden h-full" />
      </div>
    </main>
  );
}
