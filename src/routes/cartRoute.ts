import express from "express";
import { getActiveCartForUser, addItemToCart } from "../services/cartSevice";
import validateJWT from "../middlewares/validateJWT";
import { extendedRequest } from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  console.log(userId);
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.post("/items", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
