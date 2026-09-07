import { ScheduleGrid } from './schedule-grid';
import { MobileSchedule } from './mobile-schedule';
import type { ScheduleData } from '../types';

export function ScheduleView({ schedule }: { schedule: ScheduleData }) {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">课程表</h1>
      <ScheduleGrid schedule={schedule} className="hidden lg:grid" />
      <MobileSchedule schedule={schedule} className="lg:hidden" />
    </main>
  );
}
