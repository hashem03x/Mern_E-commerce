import { createContext, useContext } from "react";

interface authContextType {
  userName: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userName: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<authContextType>({
  userName: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
