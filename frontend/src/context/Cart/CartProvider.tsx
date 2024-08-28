import { FC, PropsWithChildren, useState } from "react";
import { cartContext } from "../Cart/CartContext";
import { cartItem } from "../../types/cartItem";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItemToCart = (productId: string) => {
    console.log(productId);
  };

  return (
    <cartContext.Provider value={{ addItemToCart, totalAmount, cartItems }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
