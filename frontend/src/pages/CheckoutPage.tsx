import { Box, Container, TextField, Typography } from "@mui/material";

import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef, useState } from "react";
function CheckoutPage() {
  const {
    totalAmount,
    cartItems,
    updateItemInCart,
    deleteItemInCart,
    clearCartItems,
  } = useCart();
  const [error, setError] = useState(false);
  const addressRef = useRef<HTMLInputElement>();

  const address = addressRef?.current?.value;
  const handleCheckout = () => {
    if (!address) {
      setError(true);
      return;
    }
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
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        {cartItems.map((item) => (
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <img
                style={{ borderRadius: 3 }}
                width={100}
                height={80}
                src={item.image}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: "1",
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography
                  sx={{ color: "grey", fontWeight: "bold" }}
                  variant="h6"
                >
                  {item.quantity} X {item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", mt: 3 }}>
            <Typography
              sx={{ textAlign: "right", mb: 3 }}
              color="black"
              variant="h6"
            >
              Total Amount: {totalAmount}EGP
            </Typography>
            <TextField
              error={error}
              inputRef={addressRef}
              fullWidth
              label={error ? "Address is Required" : "Address*"}
            />
            <Button
              onClick={() => handleCheckout()}
              sx={{ mt: 3, fontWeight: "bold" }}
              variant="contained"
              fullWidth
            >
              Complete Order
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default CheckoutPage;
