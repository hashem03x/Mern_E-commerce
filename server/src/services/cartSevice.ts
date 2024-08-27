import { cartModel } from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

// Creating A Cart For User
interface IcreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: IcreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

// Getting Active Cart For User
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

// Clear Cart For User
interface IEmptyCart {
  userId: any;
}
export const emptyCart = async ({ userId }: IEmptyCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

// Adding Items To Cart
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

// Update Item In Cart For User
interface IUpdateItemInCart {
  productId: any;
  userId: string;
  quantity: number;
}
export const updateItemInCart = async ({
  productId,
  userId,
  quantity,
}: IUpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existInCart) {
    return { data: "Item Does not exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product Not Found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Out Of Stock", statusCode: 400 };
  }

  existInCart.quantity = quantity;

  const otherCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

// Delete Item In Cart For User
interface IdeleteItemInCart {
  userId: string;
  productId: any;
}
export const deleteItemInCart = async ({
  userId,
  productId,
}: IdeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existInCart) {
    return { data: "Item Does not exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product Not Found", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  cart.items = otherCartItems;
  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface ICheckout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: ICheckout) => {
  const cart = await getActiveCartForUser({ userId });
  if (!address) return { data: "Please Add the address", statusCode: 400 };
  if (!cart.totalAmount || cart.totalAmount === 0)
    return { data: "Your Cart Is Empty", statusCode: 400 };
  const orderItems: IOrderItem[] = [];
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product Not Found", statusCode: 400 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: product.price,
      quantity: item.quantity,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
