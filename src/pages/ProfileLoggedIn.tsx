import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { CreateUsername } from "../components/CreateUsername";
import { useGetUserName } from "../hooks/queries/useGetUsername";
import { Edit } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { AddGoalDialog } from "../components/AddGoalDialog";

import { useGoals } from "../hooks/queries/useGoals";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";
import { transformForCal } from "../utils/transformForCal";
import { CustomHeatMap } from "../components/CustomHeatmap";
interface ProfileLoggedInProps {
  userId: string;
}
export const ProfileLoggedIn: React.FC<ProfileLoggedInProps> = ({ userId }) => {
  const user = useGetUserName(userId);
  const goals = useGoals(userId, false);
  const goalsByDate = groupGoalsByDate(goals.data);
  const data = transformForCal(goals.data)
  const [open, setOpen] = React.useState(false);
  const [isAddOpen, setIsAdd] = React.useState(false);
  const textToCopy = `http://todaysgoal.com/${user.data?.username}`;
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      setIsCopied(true);
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const onAdd = () => {
    setIsAdd(true);
  };
  const onCloseAdd = () => {
    setIsAdd(false);
  };
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  if (user.isPending) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box sx={{ p: 0 }}>
        <Box>
          {!user.data && <CreateUsername />}
          {user.data?.username && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
             
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography fontWeight={"bold"} variant="h4">
                  Today's Goals For
                </Typography>
                <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                  {isCopied ? (
                    <Typography variant="caption">copied</Typography>
                  ) : (
                    <IconButton onClick={handleCopy}>
                      <LinkIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography variant="h4">{user.data.username}</Typography>
                <Box>
                  <IconButton sx={{ ml: 1 }} size="small" onClick={onClick}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        {data.length && <CustomHeatMap data={data}/>}
        <Button
          sx={{ mb: 1, mt: 1, fontWeight:'bold' }}
          startIcon={<Add />}
          variant="outlined"
          onClick={onAdd}
          fullWidth
        >
          Add Goal
        </Button>
        {goalsByDate.map((g) => (
          <GoalsByDate date={g.date} goals={g.goals} />
        ))}
      </Box>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <CreateUsername
            onSubmit={onClose}
            existingUsername={user.data?.username}
          />
        </DialogContent>
      </Dialog>
      <AddGoalDialog open={isAddOpen} onClose={onCloseAdd} />
    </>
  );
};
