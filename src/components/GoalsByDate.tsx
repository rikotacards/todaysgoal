import React from "react";
import type { IAddedGoal } from "../types";
import { Box, Typography } from "@mui/material";
import { Goals } from "./Goals";
import { CompletionRate } from "./CompletionRate";
interface GoalsByDateProps {
  date: string;
  goals: IAddedGoal[];
  isOwner?: boolean;
  isDemo?: boolean;

}
const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
};
export const GoalsByDate: React.FC<GoalsByDateProps> = ({isDemo,  date, goals, isOwner }) => {
  const now = new Date().toISOString();
  const today = new Date(now);
  const formatted = today.toLocaleDateString("en-US", options);
  return (
    <Box>
      {formatted !== date && <Typography color='textSecondary' fontWeight={'bold'} variant="h6" sx={{mt:2, mb:2}}>{date}</Typography>}
      <Box sx={{mb:1, mt:2}}>

      <CompletionRate goals={goals} />
      </Box>
      <Goals isDemo={isDemo} isOwner={isOwner} goals={goals} />
    </Box>
  );
};
