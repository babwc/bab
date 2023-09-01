import mongoose from "mongoose";

export interface IProduct {
  uid: string;
  name: string;
  isContainer: boolean;
  department: string;
  parent: mongoose.Types.ObjectId;
  modifiers: mongoose.Types.ObjectId[] | undefined;
  image: string | null;
  inStock: boolean;
  amount: number;
  price: number;
  description: string;
}

const productSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    isContainer: { type: Boolean, default: false },
    department: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    modifiers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: undefined,
    },
    image: { type: String },
    inStock: { type: Boolean },
    amount: { type: Number },
    price: { type: Number },
    description: String,
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
