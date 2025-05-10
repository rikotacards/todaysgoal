import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useIsSmall } from "../hooks/useIsSmall";
import { Close } from "@mui/icons-material";
import { useAddGoal } from "../hooks/mutations/useAddGoal";
import { useAuthContext } from "../contexts/AuthContext";
interface AddGoalDialogProps {
  open: boolean;
  onClose: () => void;
}
export const AddGoalDialog: React.FC<AddGoalDialogProps> = ({
  open,
  onClose,
}) => {
  const isSmall = useIsSmall();
  const a = useAuthContext();
  const [desc, setDesc] = React.useState<string>("");
  React.useEffect(() => {
    setDesc("");
  }, [open]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const add = useAddGoal();
  const onSave = () => {
    add
      .mutateAsync({
        description: desc,
        user_id: a.data?.user.id || "",
      })
      .then(() => {
        onClose();
      });
  };
  if (isSmall) {
    return (
      <Drawer open={open} onClose={onClose}>
        <Box>
          <TextField value={desc} onChange={onChange} />
          <Button variant='contained' loading={add.isPending} onClick={onSave}>
            Save
          </Button>
        </Box>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Toolbar>
          <Typography fontWeight={"bold"}>Add Goal</Typography>
          <IconButton size="small" onClick={onClose} sx={{ ml: "auto" }}>
            <Close />
          </IconButton>
        </Toolbar>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography sx={{ mb: 1 }}>
              Try to be descriptive and intentional.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ mb: 1 }}>Today, I will:</Typography>
          </Box>
          <TextField
            multiline
            placeholder="Finish that thing!"
            value={desc}
            onChange={onChange}
          />
          <Button
            sx={{ mt: 1, mb: 1 }}
            loading={add.isPending}
            onClick={onSave}
            variant="contained"
          >
            Save
          </Button>
          <Button>Cancel</Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
