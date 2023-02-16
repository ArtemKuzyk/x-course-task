import React, { useContext } from "react";

const CartContext = React.createContext({});

export const CartProvider = CartContext.Provider;

export const useCart = () => useContext(CartContext);