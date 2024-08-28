import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/base_URL";
import { useAuth } from "../context/Authcontext";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  const { token } = useAuth();

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
      const data = await response.json();
      setCart(data);
      console.log(cart);
    };
    fetchCart();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Box>
        <Typography variant="h4">My Cart</Typography>
      </Box>
    </Container>
  );
}

export default CartPage;
