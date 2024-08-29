import { Box, Container, Typography } from "@mui/material";

import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const navigate = useNavigate();
  const {
    totalAmount,
    cartItems,
    updateItemInCart,
    deleteItemInCart,
    clearCartItems,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    updateItemInCart(productId, quantity);
  };
  const handleItemDelete = (productId: string) => {
    deleteItemInCart(productId);
  };
  const handlecheckout = () => {
    navigate("/checkout");
  };
  const clearCart = () => {
    clearCartItems();
  };

  return (
    <Container fixed sx={{ marginTop: 4, pb: 4, pt: 4 }}>
      <Box
        sx={{
          border: 1,
          backgroundColor: "#1976D2",
          p: 4,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">My cart</Typography>
        {cartItems.length > 0 && (
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </Box>
      <Box sx={{ mt: 4, height: "600px", overflow: "scroll" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                p: 2,
                border: 1,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  style={{ borderRadius: 3, overflow: "hidden" }}
                  width={200}
                  height={150}
                  src={item.image}
                />
                <Box>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography
                    sx={{ color: "grey", fontWeight: "bold" }}
                    variant="h6"
                  >
                    {item.quantity} X {item.unitPrice} EGP
                  </Typography>
                  <Button
                    onClick={() => handleItemDelete(item.productId)}
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="error"
                  >
                    Remove Item
                  </Button>
                </Box>
              </Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
          ))
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
            Your cart is empty.
          </Typography>
        )}
      </Box>
      {cartItems.length > 0 && (
        <Box
          sx={{
            border: 1,
            backgroundColor: "#1976D2",
            p: 4,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1976D2",
              width: "100%",
              p: 4,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Total Amount: {totalAmount}EGP</Typography>
            <Button
              onClick={() => handlecheckout()}
              variant="contained"
              color="success"
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default CartPage;
