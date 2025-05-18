import { Box, Typography, Button, useTheme } from "@mui/material";
import React from "react";
import { GoalsByDate } from "../components/GoalsByDate";
import { isInstagram } from "../utils/isInstagram";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { mockGoals } from "../mocks/goals.mock";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";
import { forCalendar } from "../mocks/forCalendar.mock";
import { transformForCal } from "../utils/transformForCal";
import { CustomActivityCalendar } from "../components/CustomActivityCalendar";

export const DemoProfile: React.FC = () => {
  const goalsByDate = groupGoalsByDate(mockGoals);
  const mockGoalsForDate = forCalendar;
  const data = transformForCal(mockGoalsForDate);
  const s = useSignInWithGoogle();
  const t = useTheme();
  const onClick = () => {
    s.mutateAsync();
  };
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
      <Box sx={{display: 'flex', width:'100%', mt:1, scrollbarWidth: 0}}>
        <CustomActivityCalendar data={data}/>
      </Box>
      {goalsByDate.map((g) => (
        <GoalsByDate isDemo date={g.date} goals={g.goals} />
      ))}

      {isInstagram() ? (
        <Box sx={{ mt: 2, width: "100%" }}>
          <a
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              textDecoration: "none",
              background: t.palette.primary.main,
              color: "black",
              padding: 8,
              borderRadius: 4,
            }}
            href="x-safari-https://todaysgoal.com"
          >
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
};


