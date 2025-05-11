import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSignOut } from "../hooks/mutations/useSignOut";

export const Settings: React.FC = () => {
  const signOut = useSignOut();
  return (
    <Box sx={{p:2}}>
      <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
        Settings
      </Typography>
      <Button
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
