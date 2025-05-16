import React from "react";
import type { IAddedGoal } from "../types";
import { Box, Card, IconButton, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { EditGoal } from "./EditGoal";
import { useEditGoal } from "../hooks/mutations/useEditGoal";
import { CustomChip } from "./CustomChip";
export const Goal: React.FC<
  IAddedGoal & { isOwner?: boolean; isDemo?: boolean }
> = ({ description, is_done, id, isOwner, isDemo, created_at }) => {
  const [open, setOpen] = React.useState(false);
  const now = new Date();
  const createdAt = new Date(created_at);

  // Extract Y/M/D
  const nowDateOnly = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const createdDateOnly = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );
  const isOverdue = nowDateOnly > createdDateOnly && !is_done;
  const onClick = () => {
    if (!isOwner && !isDemo) {
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
      <Card
        onClick={onClick}
        sx={{
          borderColor: (t) => t.palette.divider,
          borderStyle: "solid",
          borderWidth: "0.5px",
          width: "100%",
          mb: 1,
          pr: 1,
        }}
      >
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
            <IconButton  disabled={isOverdue} onClick={onToggleComplete} size="small">
              <RadioButtonUncheckedIcon />
            </IconButton>
          )}
          <Typography
            sx={{
              ml: 1,
            }}
            fontWeight={is_done ? 400 : 500}
            color={(is_done || isOverdue) ? "textSecondary" : "textPrimary"}
          >
            {description}
          </Typography>
          {isOverdue && (
            <Box sx={{ml:'auto  '}}>
              <CustomChip color='#F44336'  text="Incomplete" />
            </Box>
          )}
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
