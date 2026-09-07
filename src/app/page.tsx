import { Suspense } from 'react';
import { ScheduleView } from '@/features/schedule/component';
import { loadSchedule } from '@/features/schedule/queries';

export default function Home() {
  return (
    <Suspense fallback={<ScheduleLoading />}>
      <SchedulePage />
    </Suspense>
  );
}

async function SchedulePage() {
  const schedule = await loadSchedule();
  return <ScheduleView schedule={schedule} />;
}

function ScheduleLoading() {
  return (
    <main className="h-dvh flex flex-col w-full max-w-6xl mx-auto px-4 py-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <h1 className="text-2xl font-bold">课程表</h1>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          当前第 —— 周
        </span>
      </div>
      <p className="text-zinc-400 dark:text-zinc-600 flex-1">加载中…</p>
    </main>
  );
}
