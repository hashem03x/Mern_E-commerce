import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/base_URL";
import { useAuth } from "../context/Authentication/Authcontext";
import { useCart } from "../context/Cart/CartContext";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  const { token } = useAuth();
  const { cartItems, totalAmount } = useCart();
  // useEffect(() => {
  //   if (!token) return;
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/cart`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (!response.ok) {
  //       setError("Failed To Get User's Cart");
  //       return;
  //     }
  //     const data = await response.json();
  //     setCart(data);
  //   };
  //   fetchCart();
  // }, [token]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box>
        <Typography variant="h4">My cart</Typography>
      </Box>
      {cartItems.map((item) => (
        <Box key={item.productId}>
          {item.title}
          {totalAmount}
        </Box>
      ))}
    </Container>
  );
}

export default CartPage;
