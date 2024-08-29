import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./Authcontext";
import { BASE_URL } from "../../constants/base_URL";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  const [myOrders, setMyOrders] = useState([]);

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, userName);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUserName(null);
    setToken(null);
  };

  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/user/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;

    const data = await response.json();
    setMyOrders(data);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        userName,
        token,
        login,
        logout,
        getMyOrders,
        isAuthenticated,
        myOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
