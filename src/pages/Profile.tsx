import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

import { ProfileLoggedIn } from "./ProfileLoggedIn";
import { DemoProfile } from "./DemoProfile";

export const Profile: React.FC = () => {
  const a = useAuthContext();

  if (a.isPending) {
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
  if (!a.data?.user) {
    return <DemoProfile />;
  }
  return (
    <Box sx={{ p: 2 }}>
      <ProfileLoggedIn userId={a.data.user.id} />
    </Box>
  );
};
