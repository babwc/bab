import mongoose, { PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface ICart {
  customer: PopulatedDoc<IUser>;
  products: any;
}

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        _id: false,
        data: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// const Cart = mongoose.model("Cart", cartSchema);

// export default Cart;
