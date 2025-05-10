import {
  AppBar,
  Box,
  Button,
  Card,
  CssBaseline,
  Divider,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import React, { type PropsWithChildren } from "react";
import { useSignInWithGoogle } from "./hooks/mutations/useSignInWithGoogle";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { isInstagram } from "./utils/isInstagram";
const routes = [
  {
    name: "home",
    path: "/",
  },
];
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = React.useState<string>("/");
  const a = useAuthContext();
  const isLoggedIn = a.data?.user;
  const s = useSignInWithGoogle();
  const l = useLocation();
  const displayedRoutes = isLoggedIn
    ? [...routes, { name: "Settings", path: "/settings" }]
    : routes;
  const { pathname } = l;
  React.useEffect(() => {
    setValue(pathname);
  }, [pathname]);
  const onClick = () => {
    if (isInstagram()) {
          window.open("https://todaysgoal.com", "_blank");
        } else {
          s.mutateAsync();
        }
  };
  const nav = useNavigate();
  return (
    <>
      <CssBaseline />
      <AppBar
        sx={{
          background: (t) => (t.palette.mode === "dark" ? undefined : "white"),
          display: "flex",
          justifyContent: "center",
        }}
        elevation={0}
      >
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Tabs
            value={value}
            onChange={(_, v) => setValue(v)}
          >
            {displayedRoutes.map((t) => (
              <Tab
                sx={{ textTransform: "capitalize" }}
                onClick={() => nav(t.path)}
                key={t.name}
                label={t.name}
                value={t.path}
              />
            ))}
          </Tabs>
          {!isLoggedIn && (
            <Button onClick={onClick} sx={{ textTransform: "capitalize" }}>
              Sign in
            </Button>
          )}
        </Box>
      <Divider sx={{width:'100%'}}/>
      </AppBar>
      <Toolbar />
      <Box sx={{ maxWidth: "600px", ml: "auto", mr: "auto" }}>{children}</Box>
    </>
  );
};
