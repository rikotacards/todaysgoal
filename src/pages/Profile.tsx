import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import { ProfileLoggedIn } from "./ProfileLoggedIn";
import { mockGoals } from "../mocks/goals.mock";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";

export const Profile: React.FC = () => {
  const a = useAuthContext();

  const goalsByDate = groupGoalsByDate(mockGoals);
  if (a.isPending) {
    return <CircularProgress />;
  }
  if (!a.data?.user) {
    return (
      <Box><Box sx={{ display: "flex", flexDirection: "column" }}>
             
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography fontWeight={"bold"} variant="h4">
                  Today's Goals For
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h4">Bob</Typography>
                <Box>
                </Box>
              </Box>
            </Box>
        {goalsByDate.map((g) => (
          <GoalsByDate date={g.date} goals={g.goals} />
        ))}
      </Box>
    );
  }
  return (
    <Box sx={{ p: 2 }}>
      <ProfileLoggedIn userId={a.data.user.id} />
    </Box>
  );
};
