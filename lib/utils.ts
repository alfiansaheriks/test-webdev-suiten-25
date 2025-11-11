import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateWorkingDaysAndOvertime(clockOutTime: string): {
  days: number;
  overtime: number;
} {
  if (!clockOutTime) {
    return { days: 0, overtime: 0 };
  }

  const [hours, minutes] = clockOutTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const workEndMinutes = 17 * 60; // 17:00 = 1020 minutes

  if (totalMinutes <= workEndMinutes) {
    return { days: 1, overtime: 0 };
  }

  const overtimeMinutes = totalMinutes - workEndMinutes;
  const overtimeHours = Math.floor(overtimeMinutes / 60);
  const remainingMinutes = overtimeMinutes % 60;

  let days = 1;
  let finalOvertime = overtimeHours;

  if (overtimeHours >= 8) {
    days = 1 + Math.floor(overtimeHours / 8);
    finalOvertime = overtimeHours % 8;
  }

  return { days, overtime: finalOvertime };
}
