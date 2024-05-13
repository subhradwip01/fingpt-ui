import React, { useState } from "react";
import { createContext } from "react";
import { setAuthHeader } from "../api-service/config";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const userData = localStorage.getItem('user')
  const userObJ = userData ? JSON.parse(userData) : null
  const [user, setUser] = React.useState(userObJ);
  const [isLoggedIn, setLoggedIn] = useState(!!userData);
  const setLoggedInUser = (data) => {
    setUser(data);
    setLoggedIn(true);
    setAuthHeader(data.token);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const logout = () => {
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem("user");
    setAuthHeader('');
  };
  const authContextValue = {
    setLoggedInUser,
    logout,
    user,
    isLoggedIn,
  };
  if(userData){
    setAuthHeader(userObJ.token);
  }
  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
