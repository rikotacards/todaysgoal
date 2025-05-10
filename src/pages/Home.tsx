import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Goals } from "../components/Goals";
import { AddGoalDialog } from "../components/AddGoalDialog";
import { useGoals } from "../hooks/queries/useGoals";
import { CreateUsername } from "../components/CreateUsername";
import { Add } from "@mui/icons-material";
import { useAuthContext } from "../contexts/AuthContext";
import { HomeLoggedIn } from "./HomeLoggedIn";
import { mockGoals } from "../mocks/goals.mock";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";

export const Home: React.FC = () => {
  const a = useAuthContext();
  const goals = mockGoals;
  const goalsByDate = groupGoalsByDate(goals);

  if (a.isLoading) {
    return <CircularProgress />;
  }
  if (!a.data?.user) {
    return (
      <Box>
        {goalsByDate.map((g) => (
          <GoalsByDate date={g.date} goals={g.goals} />
        ))}
      </Box>
    );
  }
  return <HomeLoggedIn user_id={a.data.user.id} />;
};
