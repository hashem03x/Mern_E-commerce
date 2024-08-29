import { createContext, useContext } from "react";
import { cartItem } from "../../types/cartItem";

interface cartContextType {
  cartItems: cartItem[];
  totalAmount: number;
  addItemToCart: (ProductId: string) => void;
  updateItemInCart: (ProductId: string, quantity: number) => void;
  deleteItemInCart: (ProductId: string) => void;
}

export const cartContext = createContext<cartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  deleteItemInCart: () => {},
});

export const useCart = () => useContext(cartContext);
