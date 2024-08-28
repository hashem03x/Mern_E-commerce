import { createContext, useContext } from "react";
import { cartItem } from "../../types/cartItem";

interface cartContextType {
  cartItems: cartItem[];
  totalAmount: number;
  addItemToCart: (ProductId: string) => void;
}

export const cartContext = createContext<cartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
});

export const useCart = () => useContext(cartContext);
