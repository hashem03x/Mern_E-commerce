import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

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

interface IAddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: IAddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existInCart) {
    return { data: "Item Already Exists", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product Not Found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Out Of Stock", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
