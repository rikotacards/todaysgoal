import React from "react";
import type { IAddedGoal } from "../types";
import { Goal } from "./Goal";
import { Card } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
interface GoalsProps {
  goals?: IAddedGoal[];
  isOwner?: boolean;
  isDemo?: boolean;
}
export const Goals: React.FC<GoalsProps> = ({isDemo, isOwner, goals }) => {
  const a = useAuthContext();
  const uid = a.data?.user.id; 

  const displayGoals = goals?.map((g) => (
    <Goal
    isDemo={isDemo}
    isOwner={isOwner === undefined ? uid === g.user_id: isOwner}
      id={g.id}
      key={g.id}
      created_at={g.created_at}
      description={g.description}
      is_done={g.is_done}
      user_id={""}
    />
  ));
  if(displayGoals?.length === 0){
    return <Card sx={{p:2, justifyContent: 'center', textAlign: 'center'}}>No goals added</Card>
  }
  return <>{displayGoals}</>;
};
