import type { IAddedGoal } from "../types";

export const transformForCal = (goals?: IAddedGoal[] ) => {
    if(!goals){
        return []
    }
    const map = new Map<string, IAddedGoal[]>(); 
    goals.forEach((g) => {
        const date = new Date(g.created_at).toDateString()
        if(map.get(date) !== undefined){
            map.get(date)!.push(g)
        } else {
            map.set(date, [g])
        }
    })
    const res: {date: string, count: number}[] = [];
     map.forEach((value, key) => {
        const date = key; 
        const count = value.length;
        const doneCount = value.filter((g) => g.is_done).length;
        const percentComplete = Math.floor(doneCount/count*100)
        res.push( {date, count: percentComplete})
    })
    return res;
}