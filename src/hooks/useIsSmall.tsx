import { useMediaQuery, useTheme } from "@mui/material";

export function useIsSmall() {
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return isSm;
}
