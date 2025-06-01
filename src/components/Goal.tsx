import React from "react";
import type { IAddedGoal } from "../types";
import { Box, Card, IconButton, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { EditGoal } from "./EditGoal";
import { useEditGoal } from "../hooks/mutations/useEditGoal";
import { CustomChip } from "./CustomChip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FavoriteBorder } from "@mui/icons-material";
import { useLike } from "../hooks/mutations/useLike";
import { useAuth } from "../hooks/queries/useAuth";
import { useLikeSummary } from "../hooks/queries/useLikeSummary";
export const Goal: React.FC<
  IAddedGoal & { isOwner?: boolean; isDemo?: boolean }
> = ({ description, is_done, id, isOwner, isDemo, created_at, user_id }) => {
  const [demoIsDone, setDemoIsDone] = React.useState(false);

  
  const a = useAuth();
  const isDemoOnToggle = () => {
    setDemoIsDone(!demoIsDone);
  };
  const like = useLike();
  const onLike = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isDemo) {
      return;
    }
    if (!a.data) {
      return;
    }
    like.mutateAsync({
      like_receiver_id: user_id,
      like_sender_id: a.data.user.id,
      liked_content_id: `${id}`,
    });
  };
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
  const isOverdue = !isDemo && nowDateOnly > createdDateOnly && !is_done;
  const isDone = isDemo ? demoIsDone : is_done;
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
    e.stopPropagation();

    if (isDemo) {
      isDemoOnToggle();
      return;
    }
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
          {isDone ? (
            <IconButton onClick={onToggleComplete} color="success" size="small">
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={isOverdue}
              onClick={onToggleComplete}
              size="small"
            >
              {isOverdue ? (
                <HighlightOffIcon color="error" />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
          )}
          <Typography
            sx={{
              ml: 1,
            }}
            fontWeight={isDone ? 400 : 500}
            color={isDone || isOverdue ? "textSecondary" : "textPrimary"}
          >
            {description}
          </Typography>
          {isOverdue && (
            <Box sx={{ ml: "auto  " }}>
              <CustomChip color="#F44336" text="Incomplete" />
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <IconButton onClick={onLike} size="small">
              <FavoriteBorder sx={{ p: 0.3 }} color="action" fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <EditGoal
        isDemo={isDemo}
        isDone={isDone}
        open={open}
        onClose={onClose}
        description={description}
        id={id}
      />
    </>
  );
};
