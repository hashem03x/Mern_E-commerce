import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import { product } from "../types/product";
import { BASE_URL } from "../constants/base_URL";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function HomePage() {
  const [products, setProducts] = useState<product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  if (error)
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">Something Went Wrong!</Alert>
      </Stack>
    );

  return (
    <Container sx={{ mt: 3 }}>
      <Grid spacing={3} container>
        {products.map((product) => (
          <Grid key={product._id} item md={4} xs={6} height={"fit-content"}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
