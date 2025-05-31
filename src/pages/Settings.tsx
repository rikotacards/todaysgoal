import {
  Box,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useSignOut } from "../hooks/mutations/useSignOut";
import { useAuth } from "../hooks/queries/useAuth";
import { subscribeUser, unsubscribeUser } from "../utils/subscribe";
import { useSnackbar } from "notistack";

export const Settings: React.FC = () => {
  const signOut = useSignOut();
  const a = useAuth();
  const en = useSnackbar();
  
  const [isEnabled, setIsEnabled] = React.useState(false);
  if (!a.data?.user) {
    return <CircularProgress />;
  }
  const onToggle = () => {
    if(!a.data?.user.id){
      return;
    }
    if(isEnabled){
      unsubscribeUser(a.data.user.id);
          en.enqueueSnackbar("Notifications disabled", { variant: 'info'})

      return;
    }
    subscribeUser(a.data?.user.id);
    setIsEnabled(!isEnabled);
    en.enqueueSnackbar("Notifications enabled", { variant: 'default'})
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Notifications</Typography>
        <Switch sx={{ ml: "auto" }} checked={isEnabled} onChange={onToggle} />
      </Box>
      <Button
      sx={{mt:3}}
        onClick={() => signOut.mutateAsync()}
        loading={signOut.isPending}
        variant="outlined"
        color="error"
      >
        Sign out
      </Button>
    </Box>
  );
};
