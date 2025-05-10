
import type { Session } from "@supabase/supabase-js";
import type { UseQueryResult } from "@tanstack/react-query";
import React from "react";

export const AuthContext = React.createContext(
  {} as UseQueryResult<Session | null, Error>
);
export const useAuthContext = () => React.useContext(AuthContext);
