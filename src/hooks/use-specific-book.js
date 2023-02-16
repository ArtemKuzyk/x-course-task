
import React, { useContext } from "react";

const SpecificBookContext = React.createContext({});

export const SpecificBookProvider = SpecificBookContext.Provider;

export const useSpecificBook = () => useContext(SpecificBookContext);