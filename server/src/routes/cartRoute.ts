import express from "express";
import {
  getActiveCartForUser,
  addItemToCart,
  updateItemInCart,
  deleteItemInCart,
  emptyCart,
  checkout,
} from "../services/cartSevice";
import validateJWT from "../middlewares/validateJWT";
import { extendedRequest } from "../middlewares/validateJWT";
import { cartModel } from "../models/cartModel";

const router = express.Router();

router.get("/", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.delete("/", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user._id;
  const response = await emptyCart({ userId });
  res.status(response.statusCode).send(response.data);
});

router.post("/items", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});
router.put("/items", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  const response = await updateItemInCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: extendedRequest, res) => {
    const userId = req.user?._id;
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
  }
);

router.post("/checkout", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user._id;
  const { address } = req.body;
  const response = await checkout({ userId, address });
  res.status(response.statusCode).send(response.data);
});
