import { FC, PropsWithChildren, useState } from "react";
import { cartContext } from "../Cart/CartContext";
import { cartItem } from "../../types/cartItem";
import { BASE_URL } from "../../constants/base_URL";
import { useAuth } from "../Authentication/Authcontext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  const { token } = useAuth();

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        setError("Failed To Load user's Cart");
        return;
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to load cart items");
        console.log(error);
      }
      console.log(cart);
      const mappedCartItems = cart.items.map(({ product, quantity }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.price,
      }));
      setCartItems([...mappedCartItems]);
      setTotalAmount(cart.totalAmount);
    } catch {
      setError("Something Went Wrong while loading cart");
    }
  };

  return (
    <cartContext.Provider value={{ cartItems, addItemToCart, totalAmount }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
