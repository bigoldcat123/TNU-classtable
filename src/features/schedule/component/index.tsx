import { computeCurrentWeek } from '../week';
import { ScheduleGrid } from './schedule-grid';
import { MobileSchedule } from './mobile-schedule';
import { WeekBadge } from './week-badge';
import type { ScheduleData } from '../types';

export function ScheduleView({ schedule }: { schedule: ScheduleData }) {
  const currentWeek = computeCurrentWeek(schedule.weekStart);
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">课程表</h1>
        <WeekBadge weekStart={schedule.weekStart} initialWeek={currentWeek} />
      </div>
      <ScheduleGrid schedule={schedule} currentWeek={currentWeek} className="hidden lg:grid" />
      <MobileSchedule schedule={schedule} currentWeek={currentWeek} className="lg:hidden" />
    </main>
  );
}
