import { Box, Container, Typography } from "@mui/material";

import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
function CartPage() {
  const { totalAmount, cartItems, updateItemInCart, deleteItemInCart } =
    useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    updateItemInCart(productId, quantity);
  };
  const handleItemDelete = (productId: string) => {
    deleteItemInCart(productId);
  };

  return (
    <Container fixed sx={{ marginTop: 4, pb: 4, pt: 4 }}>
      <Box>
        <Typography variant="h4">My cart</Typography>
      </Box>
      <Box sx={{ mt: 4, height: "600px", overflow: "scroll" }}>
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
                disabled={item.quantity == 1}
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
        ))}
      </Box>
      <Box sx={{ border: 1, backgroundColor: "#1976D2", p: 4, color: "white" }}>
        <Typography variant="h4">Total Amount:{totalAmount}EGP</Typography>
      </Box>
    </Container>
  );
}

export default CartPage;
