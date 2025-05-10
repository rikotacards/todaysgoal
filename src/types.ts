export interface IGoal {
    date: string; 
    description: string;
    isDone: boolean;
    user_id: string;
}

export interface IAddedGoal {
    id: number;
    created_at: string; 
    description: string;
    is_done: boolean;
    user_id: string;
}