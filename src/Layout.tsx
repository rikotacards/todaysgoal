import { AppBar, Box, Button, CssBaseline, Tab, Tabs, Toolbar } from "@mui/material";
import React, { type PropsWithChildren } from "react";
import { useSignInWithGoogle } from "./hooks/mutations/useSignInWithGoogle";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
const routes = [
  {
    name: "home",
    path: "/",
  },
];
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = React.useState<string>("/");
  const a = useAuthContext();
  const isLoggedIn = a.data?.user
  const s = useSignInWithGoogle();
  const l = useLocation();
  const displayedRoutes = isLoggedIn ? [...routes, {name: 'Settings', path: '/settings'}] : routes
  const { pathname } = l;
  React.useEffect(() => {
    setValue(pathname)
  }, [pathname])
  const onClick = () => {
    s.mutateAsync();
  }
  const nav = useNavigate();
  return (
    <>
      <CssBaseline />
      <AppBar sx={{ display: "flex", flexDirection: "row", justifyContent: 'center' }} elevation={0}>
        <Tabs variant='fullWidth' value={value} onChange={(_, v) => setValue(v)}>
          {displayedRoutes.map((t) => (
            <Tab sx={{textTransform: 'capitalize'}} onClick={() => nav(t.path)} key={t.name} label={t.name} value={t.path} />
          ))}
        </Tabs>
       {!isLoggedIn &&  <Button onClick={onClick}  sx={{textTransform: 'capitalize'}}>Sign in</Button>}
      </AppBar> 
      <Toolbar/>
      <Box sx={{ maxWidth: "600px", ml: "auto", mr: "auto" }}>{children}</Box>
    </>
  );
};
