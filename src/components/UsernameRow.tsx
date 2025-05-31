import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
interface UsernameRowProps {
    username: string;
    onClick: () => void;
}
export const UsernameRow: React.FC<UsernameRowProps> = ({username, onClick}) => {
    return (
         <ListItem disableGutters disablePadding  key={username}>
                <ListItemButton onClick={onClick}>
                  <ListItemText primary={username} />
                </ListItemButton>
              </ListItem>
    )
}