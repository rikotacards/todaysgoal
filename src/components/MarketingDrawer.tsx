import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export const MarketingDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 4000);
  }, []);
  return (
    <Drawer
      anchor="bottom"
      slotProps={{
        paper: {
          style: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        },
      }}
      ModalProps={{
        keepMounted: false, // ensures body styles get removed
      }}
      open={open}
      onClose={onClose}
    >
      <Toolbar>
        <Typography fontWeight={"bold"}>Did you know</Typography>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Card sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography>
            You’re 65% more likely to meet a goal if you share it with someone.
          </Typography>
        </Card>
      </Box>
    </Drawer>
  );
};
