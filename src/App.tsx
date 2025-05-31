import { Layout } from "./Layout";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "./providers/AuthProvider";
import { PublicProfile } from "./pages/PublicProfile";
import { Settings } from "./pages/Settings";
import { Backlog } from "./pages/Backlog";
import { Habits } from "./pages/Habits";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={darkTheme}>
            <SnackbarProvider
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Layout>
                <Routes>
                  <Route element={<Profile />} path="/" />
                  <Route path="/backlog" element={<Backlog />} />
                  <Route path="/habits" element={<Habits />} />

                  <Route path="/:username" element={<PublicProfile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
