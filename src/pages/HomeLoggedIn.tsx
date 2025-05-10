import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Goals } from "../components/Goals";
import { AddGoalDialog } from "../components/AddGoalDialog";
import { useGoals } from "../hooks/queries/useGoals";
import { CreateUsername } from "../components/CreateUsername";
import { Add } from "@mui/icons-material";

interface HomeLoggedInProps {
  user_id: string;
}
export const HomeLoggedIn: React.FC<HomeLoggedInProps> = ({user_id}) => {
  
  const [open, setOpen] = React.useState<boolean>(false);
  const goals = useGoals(user_id);
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  if (goals.isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        p: 1,
      }}
    >
      <Card variant="outlined" sx={{p:2, mb:1, borderColor: t => t.palette.warning.main}}>
        <CreateUsername />
      </Card>
      <Button sx={{mb:1}} startIcon={<Add/>} variant='contained'  onClick={onClick}>Add Goal</Button>
      {!goals.data ? (
        <Typography>No goal added</Typography>
      ) : (
        <Goals isOwner goals={goals.data} />
      )}
      <AddGoalDialog open={open} onClose={onClose} />
    </Box>
  );
};
