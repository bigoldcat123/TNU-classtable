import { ScheduleView } from '@/features/schedule/component';
import { loadSchedule } from '@/features/schedule/service';

export default async function Home() {
  const schedule = await loadSchedule();
  return <ScheduleView schedule={schedule} />;
}
