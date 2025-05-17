import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import './CustomHeatmap.css';

interface MyHeatmapProps {
  data: { date: string; count: number }[];
}
export const CustomHeatMap: React.FC<MyHeatmapProps> = ({ data }) => {
  return (
    <CalendarHeatmap
      startDate={new Date("2025-01-01")}
      endDate={new Date("2025-12-31")}
      values={data}
      showWeekdayLabels
      tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
      classForValue={(value) => {
        if (!value) {
          return "color-empty";
        }
        return `color-scale-${value.count}`;
      }}
    />
  );
};
