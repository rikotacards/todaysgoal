import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { isInstagram } from "../utils/isInstagram";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";

export const MarketingDrawer: React.FC = () => {
  const t = useTheme();
  const s = useSignInWithGoogle();

  const onClick = () => {
    s.mutateAsync();
  };
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
        <Typography fontWeight={"bold"}>Did you know ? </Typography>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Toolbar>
      <Box
        sx={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <Card sx={{ m: 1, p: 2, flexDirection: "column" }}>
          <Typography fontWeight={"bold"}>
            You’re 65% more likely to meet a goal if you share it with someone.
          </Typography>
        </Card>
        <Card sx={{ m: 1, p: 2, display: "flex", flexDirection: "column" }}>
          <Typography fontWeight={"bold"}>
            Public accountability boosts follow-through by up to 95%.{" "}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            When you have a specific accountability partner (or audience), your
            chances of success skyrocket.
          </Typography>
        </Card>
        <Card sx={{ m: 1, p: 2, display: "flex", flexDirection: "column" }}>
          <Typography fontWeight={"bold"}>
            Better performance from social motiviation
          </Typography>
          <Typography sx={{ mt: 1 }}>
            A study published in the Journal of Consumer Research Participants
            who shared goals publicly felt a stronger identity connection and
            were more committed to follow through.
          </Typography>
        </Card>

        <Box sx={{ p: 1 }}>
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
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={onClick}
            >
              Sign up with Google
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
