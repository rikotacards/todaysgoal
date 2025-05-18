import type { IAddedGoal } from "../types";

export const transformForCal = (goals?: IAddedGoal[]) => {
  if (!goals) {
    return [];
  }
  const map = new Map<string, IAddedGoal[]>();
  goals.forEach((g) => {
    const date = new Date(g.created_at).toLocaleDateString("en-CA");
    if (map.get(date) !== undefined) {
      map.get(date)!.push(g);
    } else {
      map.set(date, [g]);
    }
  });

  const res: { date: string; count: number; level: number, percentComplete: number }[] = [];
  map.forEach((value, key) => {
    const date = key;
    const total = value.length;
    const doneCount = value.filter((g) => g.is_done).length || 0;
    const percentComplete = Math.round(((doneCount / total) * 100) / 20);
    res.push({ date, count: total, level: percentComplete, percentComplete: Math.round(doneCount/total * 100) });
  });
  return res.reverse();
};
