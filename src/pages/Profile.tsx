import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";

import { ProfileLoggedIn } from "./ProfileLoggedIn";
import { mockGoals } from "../mocks/goals.mock";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";
import { isInstagram } from "../utils/isInstagram";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";

export const Profile: React.FC = () => {
  const a = useAuthContext();
  const s = useSignInWithGoogle();
  const t = useTheme();
  const onClick = () => {
    s.mutateAsync();
  };

  const goalsByDate = groupGoalsByDate(mockGoals);
  if (a.isPending) {
    
    return <Box sx={{display:'flex', width:'100%', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box>;
  }
  if (!a.data?.user) {
    return (
      <Box sx={{ p: 2 }}>
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
            <Typography variant="h4">You</Typography>
            <Box></Box>
          </Box>
        </Box>
        {goalsByDate.map((g) => (
          <GoalsByDate isDemo date={g.date} goals={g.goals} />
        ))}

        {isInstagram() ? (
          <Box sx={{mt:2, width:'100%'}}>
          <a style={{display: 'block', textAlign: 'center',  width:'100%', textDecoration: 'none', background: t.palette.primary.main, color: 'black', padding: 8, borderRadius: 4}} href="x-safari-https://todaysgoal.com">
            Sign up with Google
          </a>
          </Box>
        ) : (
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onClick}>
            Sign up with Google
          </Button>
        )}
      </Box>
    );
  }
  return (
    <Box sx={{ p: 2 }}>
      <ProfileLoggedIn userId={a.data.user.id} />
    </Box>
  );
};
