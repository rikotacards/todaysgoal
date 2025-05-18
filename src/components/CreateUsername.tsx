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
import { reservedUsernames } from "../config/reservedUsernames";
interface CreateUsernameProps {
  existingUsername?: string;
  onSubmit?: () => void;
}

const isValidUsername = (username: string) => /^(?!.*\.\.)[a-zA-Z0-9._]+$/.test(username);
export const CreateUsername: React.FC<CreateUsernameProps> = ({
  onSubmit,
  existingUsername,
}) => {
  const [username, setUsername] = React.useState(existingUsername || "");
  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const { getUsername } = useUsernames();
  const a = useAuthContext();
  const add = useAddUsername();
  const update = useEditUsername();
  const onCreate = async () => {
    setLoading(true);
    setError(false);
    if (!username) {
      setError(true);
      setErrorMsg("You must enter a username");
      return;
    }
    // check if there is existing username
    const data = await getUsername(username);
    if (!data) {
      // username does not exist
      setError(false);
      if (!a.data?.user.id) {
        return;
      }
      (existingUsername?.length ? update : add)
        .mutateAsync({
          user_id: a.data.user.id,
          username,
        })
        .then(() => {
          onSubmit?.();
        });
    } else {
      // username exists
      setError(true);
      setErrorMsg("Username already exists");
    }
    setLoading(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);

    if(!isValidUsername(e.target.value)){
      setError(true)
      setErrorMsg('Invalid username')
    }
    if(e.target.value === ""){
      setError(false)
    }
    if (reservedUsernames.includes(e.target.value)) {
      setError(true);
      setErrorMsg("This is a reserved word");
      return;
    }
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
        placeholder="username"
        error={hasError}
        value={username}
        onChange={onChange}
      />

      {hasError && (
        <Typography color="error" variant="caption">
          {errorMsg}
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
