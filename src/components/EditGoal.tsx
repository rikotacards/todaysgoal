import React from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEditGoal } from "../hooks/mutations/useEditGoal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Close } from "@mui/icons-material";
import { useDeleteGoal } from "../hooks/mutations/useDeleteGoal";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
interface EditGoalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  description: string;
  isDone: boolean;
  isDemo?: boolean;
  is_backlog?: boolean;
}
export const EditGoal: React.FC<EditGoalProps> = ({
  id,
  description,
  open,
  onClose,
  isDone,
  isDemo,
  is_backlog,
}) => {
  const update = useEditGoal();
  const updateDone = useEditGoal();
  const move = useEditGoal();
  const d = useDeleteGoal();
  const [desc, setDesc] = React.useState(description);
  const canSave = desc !== description
  const moveToToday = () => {
    if (isDemo) {
      onClose();
      return;
    }
    move
      .mutateAsync({
        id,
        is_backlog: false,
        created_at: new Date().toISOString(),
      })
      .then(() => onClose());
  };

  const moveToBacklog = () => {
    if (isDemo) {
      onClose();
      return;
    }
    move
      .mutateAsync({
        id,
        is_backlog: true,
      })
      .then(() => onClose());
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const onDelete = () => {
    if (isDemo) {
      onClose();
      return;
    }
    d.mutateAsync({ id }).then(() => onClose());
  };

  const onDone = async () => {
    if (isDemo) {
      onClose();
      return;
    }
    await updateDone.mutateAsync({
      id,
      is_done: !isDone,
    });
    onClose();
  };
  const onUpdate = () => {
    if (isDemo) {
      onClose();
      return;
    }
    update
      .mutateAsync({
        id,
        description: desc,
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Toolbar>
          <Typography fontWeight={"bold"}>Edit goal</Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton size="small" onClick={onClose}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
        <Box
          sx={{ display: "flex", flexDirection: "column", p: 2, minWidth: 300 }}
        >
          <TextField multiline onChange={onChange} value={desc} />
          <Button
            variant={canSave ? "contained" : undefined}
            sx={{display: canSave ? 'flex' : 'none', mt: 1, mb: 1 , textTransform: 'capitalize'}}
            loading={update.isPending}
            onClick={onUpdate}
          >
            Save
          </Button>
          {is_backlog ? (
            <Button variant="outlined" sx={{mt:1, mb:1, textTransform: 'capitalize'}} onClick={moveToToday}>Move to today</Button>
          ) : (
            <Button
              startIcon={
                isDone ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />
              }
              loading={updateDone.isPending}
              onClick={onDone}
              variant="outlined"
              color={isDone ? "success" : undefined}
              sx={{ textTransform: "capitalize", mt: 1 }}
            >
              {isDone ? "Done" : "mark as done"}
            </Button>
          )}
          {!is_backlog && (
            <Button startIcon={<AccessTimeIcon/>} sx={{textTransform: 'capitalize', mt:1, mb:1}} onClick={moveToBacklog}>Move to backlog</Button>
          )}
          <Button sx={{textTransform: 'capitalize'}} loading={d.isPending} color="error" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
