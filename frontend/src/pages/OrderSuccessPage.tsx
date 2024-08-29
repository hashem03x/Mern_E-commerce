import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccessPage() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CheckCircleOutlineRounded sx={{ color: "green", fontSize: "90px" }} />
        <Typography variant="h4" sx={{ mt: 3 }}>
          Thanks For Your Order
        </Typography>
        <Typography variant="h6" color="grey">
          We Started Processing It. and we will get Back to You Soon
        </Typography>
        <Button
          onClick={handleHome}
          sx={{ mt: 6, fontWeight: "bold" }}
          variant="contained"
        >
          Go To Home
        </Button>
      </Box>
    </Container>
  );
}

export default OrderSuccessPage;
