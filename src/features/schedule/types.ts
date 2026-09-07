export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Day   { id: DayId; label: string }
export interface Period { id: string; label: string; time: string }
export interface Course { day: DayId; period: string; name: string; teacher?: string; room?: string }
export interface ScheduleData { days: Day[]; periods: Period[]; courses: Course[] }
