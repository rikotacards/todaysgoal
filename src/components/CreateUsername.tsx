import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useUsernames } from "../hooks/queries/useUsernames";
import { ChevronRight, Error, Info } from "@mui/icons-material";
import { useAuthContext } from "../contexts/AuthContext";
import { useAddUsername } from "../hooks/mutations/useAddUsername";
import { useEditUsername } from "../hooks/mutations/useEditUsername";
interface CreateUsernameProps {
  existingUsername?: string;
  onSubmit?: () => void;
}
export const CreateUsername: React.FC<CreateUsernameProps> = ({
  onSubmit,
  existingUsername,
}) => {
  const [username, setUsername] = React.useState(existingUsername);
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const { getUsername } = useUsernames();
  const a = useAuthContext();
  const add = useAddUsername();
  const update = useEditUsername();
  const onCreate = async () => {
    if (!username) {
      return;
    }
    setLoading(true);
    setError(false);
    const data = await getUsername(username);
    if (!data) {
      setError(false);
      if (!a.data?.user.id) {
        return;
      }
      (existingUsername ? update : add)
        .mutateAsync({
          user_id: a.data.user.id,
          username,
        })
        .then(() => {
          onSubmit?.();
        });
    } else {
      setError(true);
      console.log("DD", data);
    }
    setLoading(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (
      e.target.value === "settings" ||
      e.target.value === "setting" ||
      e.target.value === "profile" ||
      e.target.value === 'home'
    )
      setUsername(e.target.value.trim().toLocaleLowerCase());
  };
  const adornment = isLoading ? (
    <Box>
      <CircularProgress sx={{ height: 20, width: 20 }} size={"small"} />
    </Box>
  ) : hasError ? (
    <Error color="error" />
  ) : (
    <IconButton onClick={onCreate}>
      <ChevronRight />
    </IconButton>
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        fontWeight={"bold"}
        variant="body2"
        sx={{ mb: 1 }}
        color="textSecondary"
      >
        {existingUsername ? "Update username" : "Create a username"}
      </Typography>
      {existingUsername ? null : (
        <Box
          component={Paper}
          variant="outlined"
          sx={{
            mb: 1,
            alignItem: "center",
            p: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Info color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Your profile won't be visible until you create a username.
          </Typography>
        </Box>
      )}
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">{adornment}</InputAdornment>
        }
        error={hasError}
        value={username}
        onChange={onChange}
      />

      {hasError && (
        <Typography color="error" variant="caption">
          Username already exists
        </Typography>
      )}
      {existingUsername && (
        <Button variant="outlined" sx={{ mt: 1 }} onClick={onSubmit}>
          Cancel
        </Button>
      )}
    </Box>
  );
};
