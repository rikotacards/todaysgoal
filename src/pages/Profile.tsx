import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { ProfileLoggedIn } from "./ProfileLoggedIn";
import { mockGoals } from "../mocks/goals.mock";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";
import { isInstagram } from "../utils/isInstagram";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";

export const Profile: React.FC = () => {
  const a = useAuthContext();
  const s = useSignInWithGoogle();
  const onClick = () => {
    if (isInstagram()) {
      window.open("https://todaysgoal.com", "_blank");
    } else {
      s.mutateAsync();
    }
  };

  const goalsByDate = groupGoalsByDate(mockGoals);
  if (a.isPending) {
    return <CircularProgress />;
  }
  if (!a.data?.user) {
    return (
      <Box sx={{p:2}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            <Box></Box>
          </Box>
        </Box>
        {goalsByDate.map((g) => (
          <GoalsByDate date={g.date} goals={g.goals} />
        ))}
        <Button disableElevation onClick={onClick} variant="contained" sx={{ mt: 1 }} fullWidth>
          Sign up with Google
        </Button>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 2 }}>
      <ProfileLoggedIn userId={a.data.user.id} />
    </Box>
  );
};
