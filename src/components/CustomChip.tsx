import { Chip } from "@mui/material";
import React from "react";
import { colorToRgba } from "../utils/colorToRgba";

interface CustomChipProps {
  color: string;
  text: string;
  onClick?: () => void;
}

export const CustomChip: React.FC<CustomChipProps> = ({
  color,
  text,
  onClick,
}) => {
  const transparentBackground = colorToRgba(color, 0.1);

  return (
    <Chip
      onClick={onClick}
      size="small"
      sx={{
        color,
        border: `1px solid ${color}`,
        backgroundColor: transparentBackground,
      }}
      label={text}
    />
  );
};
