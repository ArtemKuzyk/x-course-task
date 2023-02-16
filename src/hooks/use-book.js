import React, { useContext } from "react";

const BookContext = React.createContext({});

export const BookProvider = BookContext.Provider;

export const useBook = () => useContext(BookContext);