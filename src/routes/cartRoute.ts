import express from "express";
import { getActiveCartForUser } from "../services/cartSevice";
import validateJWT from "../middlewares/validateJWT";
import { extendedRequest } from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: extendedRequest, res) => {
  const userId = req.user?._id;
  console.log(userId);
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
