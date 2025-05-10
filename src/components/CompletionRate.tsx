import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import type { IAddedGoal } from "../types";
interface CompletionRateProps {
  goals?: IAddedGoal[];
}
export const CompletionRate: React.FC<CompletionRateProps> = ({ goals }) => {
  const total = goals?.length || 0;
  const completed = goals?.filter((g) => g.is_done).length || 0;
  const decimal = completed / total;
  const value = Math.round(decimal * 100);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LinearProgress
      sx={{height:'8px', borderRadius: 2}}
        color="success"
        variant="determinate"
        value={completed == 0 ? 0 : value}
      />
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {completed == 0 ? (
          <Typography fontWeight={"bold"}>0 %</Typography>
        ) : (
          <Typography fontWeight={"bold"}>{value}%</Typography>
        )}
        <Typography variant="caption" sx={{ ml: 1 }}>Completed</Typography>
      </Box>
    </Box>
  );
};
