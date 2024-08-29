import { createContext, useContext } from "react";

interface authContextType {
  userName: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userName: string, token: string) => void;
  logout: () => void;
  getMyOrders: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myOrders: any[];
}

export const AuthContext = createContext<authContextType>({
  userName: null,
  token: null,
  myOrders: [],
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
