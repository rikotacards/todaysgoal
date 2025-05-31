import {
  Box,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useFollowers } from "../hooks/queries/useFollowers";
import { Close } from "@mui/icons-material";
import { useFollowings } from "../hooks/queries/useFollowings";
interface FollowersProps {
  user_id: string;
}
export const Followers: React.FC<FollowersProps> = ({ user_id }) => {
  const followers = useFollowers(user_id || "");
  const followings = useFollowings(user_id || "")
  console.log(followings.data)
  const [componentName, setOpen] = React.useState<string | null>("");
  const onClick = (name: string) => {
    setOpen(name);
  };
  const onClose = () => {
    setOpen(null);
  };
  const followersCount = followers.data?.length || 0;
  const followingsCount= followings.data?.length || 0
  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Box
        onClick={() => onClick("followers")}
        sx={{ display: "flex", flexDirection: "column", mr: 2 }}
      >
        <Typography fontWeight={"bold"}>{followersCount}</Typography>
        <Typography variant="caption">Followers</Typography>
      </Box>
      <Box onClick={() => onClick('following')} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontWeight={"bold"}>{followingsCount}</Typography>
        <Typography variant="caption">Following</Typography>
      </Box>
      <Dialog open={componentName==='following'} onClose={onClose}>
        <Toolbar>
          <Typography sx={{textTransform: 'capitalize', fontWeight: 'bold'}}>{componentName}</Typography>
          <Box sx={{ml:'auto'}}>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{minWidth:'400px', p:2}}>
          <List>
            {(followings).data?.map((f) => (
              <ListItem key={f.following_id}>
                <ListItemButton>
                  <ListItemText primary={f.following_id} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Dialog>
      <Dialog open={componentName == 'followers'} onClose={onClose}>
        <Toolbar>
          <Typography sx={{textTransform: 'capitalize', fontWeight: 'bold'}}>{componentName}</Typography>
          <Box sx={{ml:'auto'}}>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{minWidth:'400px', p:2}}>
          <List>
            {(followers).data?.map((f) => (
              <ListItem key={f.follower_id}>
                <ListItemButton>
                  <ListItemText primary={f?.usernames.username} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Dialog>
    </Box>
  );
};
