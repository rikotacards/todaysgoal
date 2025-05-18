import React from "react";
import { Tooltip as MuiTooltip } from "@mui/material";
import ActivityCalendar, { type Activity } from "react-activity-calendar";
import { green, red, yellow } from "@mui/material/colors";
interface CustomActivityCalendarProps {
  data: Activity[];
}
export const CustomActivityCalendar: React.FC<CustomActivityCalendarProps> = ({
  data,
}) => {
  return (
    <ActivityCalendar
      theme={{
        dark: [
          red["A400"],
          red["200"],
          yellow[300],
          green[300],
          green.A200,
          green["A700"],
        ],
      }}
      renderBlock={(block, activity) => (
        <MuiTooltip title={`${activity.count} activities on ${activity.date}`}>
          {block}
        </MuiTooltip>
      )}
      renderColorLegend={(block, level) => (
        <MuiTooltip title={`Level: ${level}`}>{block}</MuiTooltip>
      )}
      maxLevel={5}
      data={data.length ? data : [{ date: "2025-06-01", count: 0, level: 4 }]}
    />
  );
};
