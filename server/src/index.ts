import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";

const app = express();
const port = 3001;
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.DATABAE_URL || "")
  .then(() => console.log("Mongo Connected!"))
  .catch(() => console.log("Failed to connect"));

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

// Seed Initial Products
seedInitialProducts();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
