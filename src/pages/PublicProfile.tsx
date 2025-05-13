import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useGetUserId } from "../hooks/queries/useGetUserId";
import { useGoals } from "../hooks/queries/useGoals";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";
import LinkIcon from "@mui/icons-material/Link";
import { MarketingDrawer } from "../components/MarketingDrawer";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
export const PublicProfile: React.FC = () => {
  const { username } = useParams();
  const textToCopy = `http://todaysgoal.com/${username}`;
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
  const userId = useGetUserId(username || "");
  const goals = useGoals(userId?.data?.user_id || "", false);
  const goalsByDate = groupGoalsByDate(goals.data);
  if (goals.isLoading) {
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
  if (!userId.data) {
    return (
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography >Sorry, page not found</Typography>
        <Box sx={{mt:2}}>
          <HeartBrokenIcon color='action' />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography fontWeight={"bold"} variant="h4">
              Today's Goals for
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
          <Typography variant="h4">{username}</Typography>
        </Box>
        <Box>
          {goalsByDate.map((g) => (
            <GoalsByDate isOwner={false} goals={g.goals} date={g.date} />
          ))}
        </Box>
      </Box>
      <MarketingDrawer />
    </>
  );
};
