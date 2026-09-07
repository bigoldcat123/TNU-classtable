import type { Course } from '../types';

export function ScheduleCell({ course }: { course?: Course }) {
  if (!course) {
    return <span className="text-zinc-400 dark:text-zinc-600">—</span>;
  }
  return (
    <div>
      <p className="font-medium">{course.name}</p>
      {course.teacher && <p className="text-sm text-zinc-500 dark:text-zinc-400">{course.teacher}</p>}
      {course.room && <p className="text-sm text-zinc-500 dark:text-zinc-400">{course.room}</p>}
      {course.remark && <p className="text-xs text-zinc-500 dark:text-zinc-400">{course.remark}</p>}
    </div>
  );
}
