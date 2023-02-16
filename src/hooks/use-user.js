import React, { useContext } from "react";

const UserContext = React.createContext("");

export const UserProvider = UserContext.Provider;

export const useUser = () => useContext(UserContext);