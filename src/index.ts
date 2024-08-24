import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/E-commerce")
  .then(() => console.log("Mongo Connected!"))
  .catch(() => console.log("Failed to connect"));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
