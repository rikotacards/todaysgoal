import React from "react";
import {
  Box,
  Button,
  CircularProgress,

  Typography,
} from "@mui/material";
import { useGetUserName } from "../hooks/queries/useGetUsername";
import { Add } from "@mui/icons-material";
import { AddGoalDialog } from "../components/AddGoalDialog";

import { useGoals } from "../hooks/queries/useGoals";

import { BacklogGoal } from "../components/BacklogGoal";
interface BacklogLoggedIn {
  userId: string;
}
export const BacklogLoggedIn: React.FC<BacklogLoggedIn> = ({userId}) => {
  const goals = useGoals(userId, true);

  const [isAddOpen, setIsAdd] = React.useState(false);

  const onAdd = () => {
    setIsAdd(true);
  };
  const onCloseAdd = () => {
    setIsAdd(false);
  };

  if(goals.isLoading){
    return <Box sx={{display: 'flex', width: '100%', justifyContent: "center"}}><CircularProgress/></Box>
  }
 
  
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={"bold"} variant="h4">
                Backlog
              </Typography>
              <Typography variant="body2">
                Goals for later.
              </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{p:2}}>
        <Button
          sx={{ mb: 1, mt: 1, fontWeight: "bold" }}
          startIcon={<Add />}
          variant="outlined"
          onClick={onAdd}
          fullWidth
        >
          Add Backlog
        </Button>
        {goals.data?.map((g) => (
          <BacklogGoal
          key={g.id}
            created_at={g.created_at}
            id={g.id}
            user_id={g.user_id}
            description={g.description}
            is_done={false}
            isOwner={userId === g.user_id}
          />
        ))}
      </Box>
      <AddGoalDialog isBacklog open={isAddOpen} onClose={onCloseAdd} />
    </>
  );
};
