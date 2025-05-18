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
  isBacklog?: boolean;
}
export const AddGoalDialog: React.FC<AddGoalDialogProps> = ({
  open,
  onClose,
  isBacklog
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
        is_backlog: isBacklog
      })
      .then(() => {
        onClose();
      });
  };
  if (isSmall) {
    return (
      <Drawer
        anchor="bottom"
        slotProps={{
          paper: {
            style: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          },
        }}
        ModalProps={{
          keepMounted: false, // ensures body styles get removed
        }}
        open={open}
        onClose={onClose}
      >
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Toolbar><Typography fontWeight={'bold'}>{isBacklog ? 'Add goal for later' : 'Add goal'}</Typography>
          <Box sx={{ml:'auto'}}>
            <IconButton onClick={onClose}><Close/></IconButton>
          </Box>
          </Toolbar>
          <Box sx={{p:2, display: 'flex', flexDirection: 'column'}}>
          <Typography color='textSecondary' variant="caption" sx={{mb:1}}>Be descriptive and intentional</Typography>
          <TextField placeholder="What will you achieve today?" value={desc} onChange={onChange} />
          <Button sx={{mt:1}} variant="contained" loading={add.isPending} onClick={onSave}>
            {isBacklog ? 'Add to backlog' : 'Add'}
          </Button>
          </Box>
        </Box>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Toolbar>
          <Typography fontWeight={"bold"}>{isBacklog ? 'Add goal for later': 'Add goal'}</Typography>
          <IconButton size="small" onClick={onClose} sx={{ ml: "auto" }}>
            <Close />
          </IconButton>
        </Toolbar>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography variant='body2' sx={{ mb: 1 }}>
              Try to be descriptive and intentional.
            </Typography>
          </Box>
          {!isBacklog && <Box>
            <Typography variant='body2' sx={{ mb: 1 }}>Today, I will:</Typography>
          </Box>}
          <TextField
            multiline
            placeholder="Finish that thing!"
            value={desc}
            onChange={onChange}
          />
          <Button
            sx={{ mt: 1, mb: 1, textTransform: 'capitalize'}}
            loading={add.isPending}
            onClick={onSave}
            variant="contained"
          >
            {isBacklog ? 'Add to backlog' : 'Add Goal'}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
