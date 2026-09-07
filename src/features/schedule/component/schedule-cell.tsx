import type { Course } from '../types';

export function ScheduleCell({ course }: { course?: Course }) {
  if (!course) {
    return <span className="text-zinc-400">—</span>;
  }
  return (
    <div>
      <p className="font-medium">{course.name}</p>
      {course.teacher && <p className="text-sm text-zinc-500">{course.teacher}</p>}
      {course.room && <p className="text-sm text-zinc-500">{course.room}</p>}
    </div>
  );
}
