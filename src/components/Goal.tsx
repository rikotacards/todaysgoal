import React from "react";
import type { IAddedGoal } from "../types";
import { Box, Card, IconButton, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { EditGoal } from "./EditGoal";
import { useEditGoal } from "../hooks/mutations/useEditGoal";
export const Goal: React.FC<IAddedGoal & { isOwner?: boolean; isDemo?: boolean; }> = ({
  description,
  is_done,
  id,
  isOwner,
  isDemo, 
}) => {
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    if (!isOwner  && !isDemo) {
      return;
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const u = useEditGoal();
  const onToggleComplete = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (!isOwner) {
      return;
    }
    e.stopPropagation();
    u.mutateAsync({ id, is_done: !is_done });
  };
  return (
    <>
      <Card  onClick={onClick} sx={{ width: "100%", mb: 1, pr:1}}>
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {is_done ? (
            <IconButton onClick={onToggleComplete} color="success" size="small">
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onToggleComplete} size="small">
              <RadioButtonUncheckedIcon />
            </IconButton>
          )}
          <Typography sx={{ml:1}} color={is_done ? 'textSecondary': 'textPrimary'}>{description}</Typography>
      
        </Box>
      </Card>
      <EditGoal
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
