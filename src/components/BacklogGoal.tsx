import React from "react";
import type { IAddedGoal } from "../types";
import { Box, Card, Typography } from "@mui/material";
import { EditGoal } from "./EditGoal";
export const BacklogGoal: React.FC<
  IAddedGoal & { isOwner?: boolean; isDemo?: boolean }
> = ({ description, is_done, id, isOwner, isDemo }) => {
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    if (!isOwner && !isDemo) {
      return;
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Card onClick={onClick} sx={{ width: "100%", mb: 1, pr: 1 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              ml: 1,
            }}
            color={is_done ? "textSecondary" : "textPrimary"}
          >
            {description}
          </Typography>
        </Box>
      </Card>
      <EditGoal
        is_backlog
        isDemo={isDemo}
        isDone={is_done}
        open={open}
        onClose={onClose}
        description={description}
        id={id}
      />
    </>
  );
};
