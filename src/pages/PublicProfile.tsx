import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useGetUserId } from "../hooks/queries/useGetUserId";
import { useGoals } from "../hooks/queries/useGoals";
import { groupGoalsByDate } from "../utils/groupGoalsByDate";
import { GoalsByDate } from "../components/GoalsByDate";
import LinkIcon from "@mui/icons-material/Link";
import { MarketingDrawer } from "../components/MarketingDrawer";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { CustomActivityCalendar } from "../components/CustomActivityCalendar";
import { transformForCal } from "../utils/transformForCal";
import { useAuth } from "../hooks/queries/useAuth";
export const PublicProfile: React.FC = () => {
  const { username } = useParams();
  const a = useAuth();
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
  const data = transformForCal(goals.data);
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
        <Typography>Sorry, page not found</Typography>
        <Box sx={{ mt: 2 }}>
          <HeartBrokenIcon color="action" />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{ mb: 2 }}>
          {a.data?.user.id && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 1,
                mb: 1,
              }}
              variant="outlined"
              component={Card}
            >
              <Typography color="textSecondary" variant="caption">
                This how others see your profile
              </Typography>
              <Box sx={{ ml: "auto" }}>
                <Button
                  onClick={handleCopy}
                  sx={{ textTransform: "capitalize", ml: "auto" }}
                  size="small"
                >
                  {isCopied ? "Copied" : "Copy Url"}
                </Button>
              </Box>
            </Box>
          )}
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
        <Box sx={{ mb: 2 }}>
          <CustomActivityCalendar
            data={
              data.length ? data : [{ date: "2025-05-18", count: 0, level: 0 }]
            }
          />
        </Box>
        <Box>
          {goalsByDate.map((g) => (
            <GoalsByDate isOwner={false} goals={g.goals} date={g.date} />
          ))}
        </Box>
      </Box>
      {!a.data?.user && <MarketingDrawer />}
    </>
  );
};
