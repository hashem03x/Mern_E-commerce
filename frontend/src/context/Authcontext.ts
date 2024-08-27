import { createContext, useContext } from "react";

interface authContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
}

export const AuthContext = createContext<authContextType>({
  userName: null,
  token: null,
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);
