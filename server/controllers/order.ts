require("dotenv").config();
import { Request, Response } from "express";

import Stripe from "stripe";

import User from "../model/User";
import Product from "../model/Product";
import Order from "../model/Order";

import { sendEmail } from "../utils/email";
import { TypedRequestParams, TypedRequestBody } from "../ts/interfaces";
import { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

interface IProduct {
  data: {
    image: string;
    name: string;
    department: string;
    price: string;
  };
  quantity: number;
}

interface Item extends IProduct {
  id: string;
}

interface GetAllQuery {
  limit?: number;
  currentPage?: number;
  status?: string;
  searchValue?: string;
}

interface ConfirmBody {
  items: Item[];
  customer: string;
  paymentId: string;
  phone: string;
  date: string;
}

export const getAll = async (
  req: TypedRequestParams<GetAllQuery>,
  res: Response
) => {
  const { status, searchValue, currentPage, limit } = req.query;

  try {
    let params: {
      status?: string;
      customer?: { $regex: string | undefined; $options: string };
      orderNumber?: string;
    } = {};

    if (status !== "All") params.status = status;

    // A user/admin can search for an order either by name or order number, so if the search value is number, it's safe to assume that user/admin tries to find an order by its number, otherwise it's name of a customer who made an order
    if ((searchValue?.length as number) >= 3) {
      if (isNaN(+searchValue!)) {
        params.customer = { $regex: searchValue, $options: "i" };
      } else {
        params.orderNumber = searchValue;
      }
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

export const accept = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const order = await Order.findOne({ _id });

    if (!order) return res.status(400).json("Order doesn't exist");

    const intent = await stripe.paymentIntents.capture(order.paymentId);

    if (intent.status === "succeeded") {
      order.status = "Accepted";

      await order.save();

      return res.status(200).json("Successfully uodated");
    }

    return res.status(400).json("Something went wrong");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const cancel = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const order = await Order.findOne({ _id });

    if (!order) return res.status(400).json("Order doesn't exist");

    await stripe.paymentIntents.cancel(order.paymentId);

    order.status = "Cancelled";

    await order.save();

    return res.status(200).json("Successfully uodated");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

const calculateOrderAmount = async (items: Item[]) => {
  const products = await Product.find({
    _id: { $in: items.map(({ id }) => id) },
  })
    .select("_id price")
    .lean();

  if (!products) return;

  const total = products.reduce((acc, _product): number => {
    const item = items.find((_item) => _item.id === _product._id.toString());

    return item ? (acc += _product.price! * item.quantity) : 0;
  }, 0);

  return Number((total * 100).toFixed());
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { items } = req.body;

  try {
    const total = await calculateOrderAmount(items);

    if (!total) return res.status(400).json("Invalid data");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      payment_method_types: ["card"],
      capture_method: "manual",
    });

    res.status(200).json({
      paymentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const confirm = async (
  req: TypedRequestBody<ConfirmBody>,
  res: Response
) => {
  const { items, customer, paymentId, phone, date } = req.body;

  try {
    const orderAmount = await calculateOrderAmount(items);

    if (!orderAmount) return res.status(400).json("Invalid data");

    const order = new Order({
      items: items.map(({ id, data: product, quantity }) => {
        return {
          product: {
            id,
            image: product.image,
            name: product.name,
            department: product.department,
            price: product.price,
          },
          quantity,
        };
      }),
      orderNumber: Math.floor(Math.random() + Date.now()),
      phone,
      customer,
      date,
      paymentId,
      totalPrice: orderAmount / 100,
    });

    await order.save();

    const getContent = () => {
      let total = 0;
      const content = order.items.reduce((result, { product, quantity }) => {
        const { name, price } = product;
        total += Number(quantity) * Number(price);

        return (result += `<li style="margin: 10px 0; display: flex">
            ${name}, 
            <div>
              <h4 style="display:inline">${quantity}</h4>
            </div>
          </li>`);
      }, "");

      return { content, total };
    };

    const { content, total } = getContent();

    await sendEmail({
      email: process.env.INBOUND_EMAIL as string,
      subject: "New Order",
      content: `
          <ul style="margin:0">
            ${content}
          </ul>
          <h3>Total: $${total}</h3>
        `,
    });

    return res.status(200).json({
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
