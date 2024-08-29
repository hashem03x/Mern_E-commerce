import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
import("dotenv/config");

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) return { data: "User already exists!", statusCode: 400 };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  await newUser.save();
  return { data: generateJWT({ firstName, email, password }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser)
    return { data: "Incorrect Email or Password", statusCode: 400 };

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect Email or Password", statusCode: 400 };
};

interface myOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: myOrdersParams) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (error) {
    throw error;
  }
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "");
};
