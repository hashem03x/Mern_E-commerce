import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import validateJWT, { extendedRequest } from "../middlewares/validateJWT";
import { getActiveCartForUser } from "../services/cartSevice";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });

  response.status(statusCode).json(data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  response.status(statusCode).json(data);
});

router.get(
  "/orders",
  validateJWT,
  async (request: extendedRequest, response) => {
    try {
      const userId = request?.user?._id;
      const { data, statusCode } = await getMyOrders({ userId });
      response.status(statusCode).send(data);
    } catch (error) {
      throw error;
    }
  }
);
export default router;
