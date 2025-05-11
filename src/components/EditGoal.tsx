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
import {

  Close,
} from "@mui/icons-material";
import { useDeleteGoal } from "../hooks/mutations/useDeleteGoal";
interface EditGoalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  description: string;
  isDone: boolean;
  isDemo?: boolean;
}
export const EditGoal: React.FC<EditGoalProps> = ({
  id,
  description,
  open,
  onClose,
  isDone, 
  isDemo
}) => {
  const update = useEditGoal();
  const updateDone = useEditGoal();
  const d = useDeleteGoal();
  const [desc, setDesc] = React.useState(description);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const onDelete = () => {
    if(isDemo){
      onClose();
      return
    }
    d.mutateAsync({ id }).then(() => onClose());
  };

  const onDone = async () => {
    if(isDemo){
      onClose();
      return;
    }
    await updateDone.mutateAsync({
      id, 
      is_done: !isDone
    })
    onClose();
  }
  const onUpdate = () => {
    if(isDemo){
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
        <Toolbar >
          <Typography fontWeight={'bold'}>Edit goal</Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton size='small' onClick={onClose}>
              <Close fontSize="small"/>
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ display: "flex", flexDirection: "column", p: 2, minWidth: 300 }}>
          <TextField multiline onChange={onChange} value={desc} />
          <Button
          startIcon={isDone ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/> }
          loading={updateDone.isPending}
          onClick={onDone} variant='outlined' color={isDone ? 'success' : undefined} sx={{textTransform: 'capitalize', mt:1}}>{isDone ? 'Done' : 'mark as done'}</Button>
          <Button
            variant={desc !== description ? "contained" : undefined}
            sx={{ mt: 1, mb: 1 }}
            loading={update.isPending}
            onClick={onUpdate}
          >
            Save
          </Button>
          <Button
            sx={{ mb: 1 }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            loading={d.isPending}
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
