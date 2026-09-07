'use client';

import { useEffect, useState } from 'react';
import { computeCurrentWeek } from '../week';

export function WeekBadge({ weekStart, initialWeek }: { weekStart: string; initialWeek: number }) {
  const [week, setWeek] = useState<number>(initialWeek);
  useEffect(() => {
    setWeek(computeCurrentWeek(weekStart));
  }, [weekStart]);
  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      当前第 {week} 周
    </span>
  );
}
