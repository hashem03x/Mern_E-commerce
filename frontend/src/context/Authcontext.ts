import { createContext, useContext } from "react";

interface authContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<authContextType>({
  userName: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);
