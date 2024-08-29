import { FC, PropsWithChildren, useEffect, useState } from "react";
import { cartContext } from "../Cart/CartContext";
import { cartItem } from "../../types/cartItem";
import { BASE_URL } from "../../constants/base_URL";
import { useAuth } from "../Authentication/Authcontext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  const { token } = useAuth();

  // Function To Handle Adding Items in Cart
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
      const mappedCartItems = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );
      setCartItems([...mappedCartItems]);
      setTotalAmount(cart.totalAmount);
    } catch {
      setError("Something Went Wrong while loading cart");
    }
  };
  // Function To Handle Update Items in Cart
  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        setError("Failed To Update user's Cart");
        return;
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to Update cart items");
        console.log(error);
      }
      console.log(cart);
      const mappedCartItems = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );
      setCartItems([...mappedCartItems]);
      setTotalAmount(cart.totalAmount);
    } catch {
      setError("Something Went Wrong while Updating cart");
    }
  };

  // Function To Handle Delete Items From Cart
  const deleteItemInCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed To Delete Item from Cart");
        return;
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to Delete cart item");
        console.log(error);
      }
      console.log(cart);
      const mappedCartItems = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );
      setCartItems([...mappedCartItems]);
      setTotalAmount(cart.totalAmount);
    } catch {
      setError("Something Went Wrong while Deleting Item");
    }
  };

  // Function To Clear All Items From Cart
  const clearCartItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed To Empty Cart");
        return;
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to Empty cart ");
      }
      setCartItems([]);
      setTotalAmount(0);
    } catch {
      setError("Something Went Wrong while Deleting Item");
    }
  };

  // UseEffect to Handle Loading items in cart
  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setError("Failed To Get User's Cart");
        return;
      }
      const cart = await response.json();
      const mappedCartItems = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.price,
        })
      );
      setCartItems(mappedCartItems);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        updateItemInCart,
        deleteItemInCart,
        clearCartItems,
        totalAmount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
