import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import './CustomHeatmap.css';

interface MyHeatmapProps {
  data: { date: string; count: number }[];
}
export const CustomHeatMap: React.FC<MyHeatmapProps> = ({ data }) => {
    const firstLoggedDate = new Date(data[data.length-1].date)
    const startDate = `${firstLoggedDate.getFullYear()}-${firstLoggedDate.getMonth()}-${firstLoggedDate.getDate()}`
    return (
    <CalendarHeatmap
      startDate={new Date(startDate)}
      endDate={new Date("2025-12-31")}
      values={data}
      classForValue={(value) => {
        if (!value) {
          return "color-empty";
        }
        return `color-scale-${Math.floor(value.count/5) * 5}`;
      }}
    />
  );
};
