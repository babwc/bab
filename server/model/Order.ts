import mongoose from "mongoose";

enum OrderStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  CANCELLED = "Cancelled",
}

interface IProductInOrder {
  department: string;
  id: string;
  image: string;
  name: string;
  price: string;
}

interface Item {
  product: IProductInOrder;
  quantity: number;
}

interface IOrder {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  customer: string;
  date: string;
  items: Item[];
  orderNumber: string;
  paymentId: string;
  phone: string;
  status: string;
  totalPrice: number;
}

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [
        {
          _id: false,
          product: {
            _id: false,
            id: String,
            image: String,
            name: String,
            department: String,
            price: String,
          },
          quantity: Number,
        },
      ],
      default: undefined,
    },
    status: { type: String, required: true, default: OrderStatus.PENDING },
    customer: { type: String, required: true },
    orderNumber: { type: Number },
    date: { type: String },
    phone: { type: String, required: true },
    paymentId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
