import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../model/User";
import Order from "../model/Order";

import { TypedRequestParams } from "../ts/interfaces";

export const info = async (req: Request, res: Response) => {
  const _id = req.query.id;

  try {
    const user = await User.findOne({ _id });

    if (!user) return res.status(400).json("User doesn't exist");

    const { name, email } = user;

    return res.status(200).json({ name, email });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const myOrders = async (req: TypedRequestParams<any>, res: Response) => {
  const { name, status, searchValue, limit, currentPage } = req.query;

  try {
    let params: { status?: string; customer: string; orderNumber?: string } = {
      customer: name!,
    };

    if (status !== "All") params.status = status;

    if ((searchValue?.length as number) >= 6) {
      params = { orderNumber: searchValue, customer: name! };
    }

    const total = await Order.countDocuments(params);

    let orders;

    if (limit && currentPage) {
      orders = await Order.find(params)
        .limit(limit)
        .skip((currentPage - 1) * limit);
    } else {
      orders = await Order.find(params);
    }

    return res.status(200).json({ orders, total });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const edit = async (req: Request, res: Response) => {
  const { id: _id, name, email } = req.body;

  try {
    await User.findOneAndUpdate({ _id }, { name, email });

    return res.status(200).json("Profile has been succussfully updated");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const changepass = async (req: Request, res: Response) => {
  const { id: _id, password, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id });

    if (!user) return res.status(400).json("User doesn't exist");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) return res.status(404).json("Invalid current password");

    if (newPassword.length < 8 && newPassword.length > 16) {
      return res
        .status(404)
        .json("Password should contain between 8 and 16 characters");
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);

    user.password = hashedPass;

    await user.save();

    return res.status(200).json("Profile has been succussfully updated");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
