// Temporarily off

import { Request, Response } from "express";

import Product from "../model/Product";
import User from "../model/User";

const Cart: any = undefined;

export const one = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const cartData = await Cart.findOne({ customer: id })
      .populate({
        path: "products",
        populate: "data",
      })
      .select("-updatedAt -createdAt");

    return res.status(200).json(cartData);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const add = async (req: Request, res: Response) => {
  const { customerId, productId, quantity } = req.body;
  // check if product is NOT a container

  try {
    const productFound = await Product.findOne({ _id: productId });

    if (productFound?.isContainer)
      res.status(400).json("Wrong kind of product");

    let cart: any;

    const user: any = await User.findById({ _id: customerId });

    if (user?.cart) {
      cart = await Cart.findById({ _id: user.cart }).populate({
        path: "products",
        populate: "data",
      });

      const product = cart.products.find((product: any) => {
        if (product.data._id.toString() === productId) {
          return product;
        }
      });

      if (product) {
        product.quantity += quantity;

        await cart.save();
      } else {
        cart.products.push({ data: productId, quantity });
      }
    } else {
      cart = new Cart({
        customer: customerId,
      });

      cart.products.push({ data: productId, quantity });
      user.cart = cart._id;

      await user.save();
    }

    await cart.save();

    res.status(201).json({ message: "Successfully added to cart" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const addMultiple = async (req: Request, res: Response) => {
  const { customerId, storedUserId, products, updatedAt } = req.body;

  try {
    if (customerId !== storedUserId) {
      res.status(400).json({ error: "User data doesn't match" });
    }

    let cart: any;
    const user: any = await User.findById({ _id: customerId });
    const cartExists = await Cart.findOne({ customer: customerId });

    if (!user) res.status(400).json({ error: "User doesn't exist" });

    if (cartExists) {
      cart = cartExists;

      if (cart.customer.toString() === customerId) {
        const cartUpdDate = new Date(cart.updatedAt);
        const cartLocalUpdDate = new Date(updatedAt);

        if (cartLocalUpdDate.getTime() > cartUpdDate.getTime()) {
          if (products.length) {
            cart.products = products;
          } else {
            await cart.delete();
            user.cart = null;

            await user.save();
          }
        } else {
          return res.status(200).json({ message: "Success" });
        }
      }
    } else {
      if (!products.length) {
        return res.status(200).json({ message: "Empty" });
      }

      const count = await Product.count({
        _id: {
          $in: products.map(({ data: id }: any) => id),
        },
      });

      if (count !== products.length)
        return res.status(400).json({ error: "Something went wrong" });

      cart = new Cart({
        customer: user._id,
      });

      cart.products = products;

      user.cart = cart._id;

      await user.save();
    }

    await cart.save();

    res.status(200).json({ message: "Successfully added to cart" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const addOne = async (req: Request, res: Response) => {
  const { customerId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });

    cart?.products.forEach((product: any) => {
      if (product.data.toString() === productId) {
        product.quantity += 1;
      }
    });

    await cart?.save();

    res.status(200).json({ message: "Successfully added to cart" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const subtractOne = async (req: Request, res: Response) => {
  const { customerId, productId } = req.body;

  try {
    const cart: any = await Cart.findOne({ customer: customerId });

    let productToRemove: any = null;

    cart?.products.forEach((product: any) => {
      if (product.data.toString() === productId) {
        product.quantity -= 1;

        if (product.quantity < 1) productToRemove = product.data;
      }
    });

    await cart?.save();

    res.status(200).json({ message: "Successfully removed from cart" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const remove = async (req: Request, res: Response) => {
  const { cartId: _id, productId } = req.body;

  try {
    const cart: any = await Cart.findOne({ _id });

    const productsUpdated = cart.products.filter(({ data }: any) => {
      return data.toString() !== productId;
    });

    if (!productsUpdated.length) {
      await User.findOneAndUpdate({ _id: cart.customer }, { cart: null });
      await cart.delete();
    } else {
      cart.products = productsUpdated;
    }

    await cart.save();

    res.status(200).json({ message: "Successfully removed from cart" });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
