import type { IAddedGoal } from "../types";

export interface DateGroups {
  [key: string]: IAddedGoal[];
}
const options: Intl.DateTimeFormatOptions = {
     weekday: "short", 
  month: "short",
  day: "numeric",
  year: "numeric",
};
// [{date: fdl, goals: []}]
export const groupGoalsByDate = (goals?: IAddedGoal[]) => {
  const list: { date: string, goals: IAddedGoal[] }[] = [];
  const dateGroups: DateGroups = {};
  if (!goals) {
    return list;
  }
  goals.forEach((goal) => {
    const date = new Date(goal.created_at);
    const formatted = date
      .toLocaleDateString("en-US", options)

    if (dateGroups[formatted]) {
      dateGroups[formatted].push(goal);
    } else {
      dateGroups[formatted] = [goal];
    }
  });
  for(const date in dateGroups){
    list.push({date, goals: dateGroups[date]})
  }
  return list;
};
