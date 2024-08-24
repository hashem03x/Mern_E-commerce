import { cartModel } from "../models/catrModel";

interface IcreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: IcreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface IGetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: IGetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
