import type { IAddedGoal } from "../types";

// string in YYYY-MM-DD
export const createDateMap = (startDateStr: string, endDateStr: string) => {
  const map = new Map<string, IAddedGoal[]>();
  const current = new Date(startDateStr);
  const end = new Date(endDateStr);

  while (end > current) {
    const dateKey = end.toLocaleDateString('en-CA'); // "YYYY-MM-DD"
    map.set(dateKey, [] as IAddedGoal[]); // Or whatever initial value you want
    end.setDate(end.getDate() - 1); // move to next day
  }

  return map;
};