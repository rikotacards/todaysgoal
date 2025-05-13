import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { Add } from "@mui/icons-material";
import { AddGoalDialog } from "../components/AddGoalDialog";

import { Goal } from "../components/Goal";
import { useAuthContext } from "../contexts/AuthContext";
import { mockGoals } from "../mocks/goals.mock";
import { BacklogLoggedIn } from "./BacklogLoggedIn";

export const Backlog: React.FC = () => {
  const a = useAuthContext();

  const [isAddOpen, setIsAdd] = React.useState(false);

  const onAdd = () => {
    setIsAdd(true);
  };
  const onCloseAdd = () => {
    setIsAdd(false);
  };

  if (a.isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!a.data?.user) {
    return (
      <>
        <Box sx={{ m: 2 }}>
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontWeight={"bold"} variant="h4">
                Backlog
              </Typography>
              <Typography variant="body2">Goals for later.</Typography>
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
            disabled
          >
            Add backlog
          </Button>
          {mockGoals?.map((g) => (
            <Goal
              created_at={g.created_at}
              id={g.id}
              user_id={g.user_id}
              description={g.description}
              is_done={false}
            />
          ))}
        </Box>
        <AddGoalDialog open={isAddOpen} onClose={onCloseAdd} />
      </>
    );
  }
  return <BacklogLoggedIn userId={a.data?.user.id} />;
};
