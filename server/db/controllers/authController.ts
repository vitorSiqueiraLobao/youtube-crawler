import { UserModel } from "../models/userModel";
import { Request, Response } from "express";
export const register = async (req: Request, res: Response) => {
  console.table(UserModel);
  const user = await UserModel.create(req.body);
};
export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.send(users);
};
