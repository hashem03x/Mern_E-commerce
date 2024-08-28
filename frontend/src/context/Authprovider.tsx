import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./Authcontext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem("username", userName);
    localStorage.setItem("token", token);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ userName, token, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
