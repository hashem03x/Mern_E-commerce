import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";
import { EnumType } from "typescript";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: Number;
  quantity: Number;
}

export interface ICart extends Document {
  userId: ObjectId | String;
  items: ICartItem[];
  totalAmount: Number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "active", enum: cartStatusEnum },
});

export const cartModel = mongoose.model("Cart", cartSchema);
