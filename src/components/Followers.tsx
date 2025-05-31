import {
  Box,
  Dialog,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useFollowers } from "../hooks/queries/useFollowers";
import { Close } from "@mui/icons-material";
import { useFollowings } from "../hooks/queries/useFollowings";
import { useNavigate } from "react-router-dom";
import { UsernameRow } from "./UsernameRow";
interface FollowersProps {
  user_id: string;
}
export const Followers: React.FC<FollowersProps> = ({ user_id }) => {
  const followers = useFollowers(user_id || "");
  const nav = useNavigate();
  const followings = useFollowings(user_id || "");
  const [componentName, setOpen] = React.useState<string | null>("");
  const onClick = (name: string) => {
    setOpen(name);
  };
  const onClose = () => {
    setOpen(null);
  };
  const go = (username: string) => {
    nav("/" + username);
    onClose();
  };
  const followersCount = followers.data?.length || 0;
  const followingsCount = followings.data?.length || 0;
  const followingRows = followings.data?.map((f) => (
    <UsernameRow
      username={f.username.username}
      onClick={() => go(f.username.username)}
    />
  ));
  const followerRows = followers.data?.map((f) => (
    <UsernameRow
      username={f.username?.username}
      onClick={() => go(f.username?.username)}
    />
  ));
  console.log("f", followers.data);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Box
        onClick={() => onClick("followers")}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          mr: 2,
        }}
      >
        <Typography fontWeight={"bold"}>{followersCount}</Typography>
        <Typography variant="caption">Followers</Typography>
      </Box>
      <Box
        onClick={() => onClick("following")}
        sx={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
      >
        <Typography fontWeight={"bold"}>{followingsCount}</Typography>
        <Typography variant="caption">Following</Typography>
      </Box>
      <Dialog open={componentName === "following"} onClose={onClose}>
        <Toolbar>
          <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {componentName}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ minWidth: "400px" }}>
          <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {followingRows}
          </List>
        </Box>
      </Dialog>
      <Dialog open={componentName == "followers"} onClose={onClose}>
        <Toolbar>
          <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {componentName}
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ minWidth: "400px", p: 2 }}>
          <List>{followerRows}</List>
        </Box>
      </Dialog>
    </Box>
  );
};
