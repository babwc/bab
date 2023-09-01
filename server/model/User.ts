import mongoose from "mongoose";
import { Role } from "../ts/types";

export interface IUser {
  name: string;
  email: string;
  role: Role;
  password: string;
  active: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    role: { type: String, required: true, default: "user" },
    // cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    active: { type: Boolean, required: true, default: false },
    confirmCode: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
