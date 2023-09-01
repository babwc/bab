import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

import fs from "fs";

import ShortUniqueId from "short-unique-id";

import Product from "../model/Product";
import User from "../model/User";

import { TypedRequestParams } from "../ts/interfaces";

import { IProduct } from "../model/Product";

interface GetAll {
  searchValue: string;
  department: string;
  currentPage: number;
  limit: number;
}

export const all = async (req: TypedRequestParams<GetAll>, res: Response) => {
  const { searchValue, department, currentPage, limit } = req.query;

  const options = {
    name: { $regex: searchValue, $options: "i" },
    parent: null,
    department,
  };

  try {
    const total = await Product.countDocuments({
      department,
      parent: undefined,
    });

    const products = await Product.find(options)
      .populate("modifiers")
      .select("-updatedAt -createdAt")
      .limit(limit)
      .skip((currentPage - 1) * limit);

    return res.status(200).json({ products, total });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const search = async (req: Request, res: Response) => {
  const { name, exclude } = req.body;

  const department = req.body.department || null;

  try {
    let options: {
      _id: { $nin: string };
      name: { $regex: string; $options: "i" };
      parent?: null;
      isContainer?: boolean;
      department?: string;
    } = {
      _id: { $nin: exclude },
      name: { $regex: name, $options: "i" },
    };

    if (req.body.container) {
      options.parent = null;
      options.isContainer = false;
    } else {
      options.isContainer = true;
    }

    if (department) options.department = department;

    const products = await Product.find(options);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const some = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const products = await Product.find({ parent: _id });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const many = async (req: Request, res: Response) => {
  try {
    const ids = req.body.ids;

    const products = await Product.find({
      _id: {
        $in: ids,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const one = async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;

    const product = await Product.findOne({ uid }).populate("parent");

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id: _id, inStock } = req.body;

  try {
    await Product.findOneAndUpdate(
      { _id },
      { $set: { inStock } },
      { new: true }
    );

    return res.status(200).json("Product has been successfully updated");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const add = async (req: Request, res: Response) => {
  const { name, price, description, department, modifiers, parent } = req.body;

  const isContainer = JSON.parse(req.body.isContainer);

  try {
    if (!name || !description || (!isContainer && !price)) {
      return res.status(400).json("Fill all required fields");
    }
    //additional check for department
    if (name.length <= 2) {
      return res
        .status(400)
        .json("Name is too short, at least 3 characters are required");
    }

    const uid = new ShortUniqueId({ length: 10 });

    const product = new Product({
      uid: uid(),
      name,
      department,
      isContainer,
      image: req.file?.filename,
      description,
    });

    if (isContainer && modifiers.length) {
      let modifiersFiltered = JSON.parse(modifiers).map(
        ({ _id }: { _id: string }) => _id
      );

      product.modifiers = modifiersFiltered;

      await Product.updateMany(
        { _id: { $in: modifiersFiltered } },
        { $set: { parent: product._id } },
        { multi: true }
      );
    } else if (!isContainer) {
      product.price = price;
      product.inStock = true;

      if (parent) {
        product.parent = parent._id;

        await Product.updateOne(
          { _id: parent._id },
          { $push: { modifiers: product._id } }
        );
      }
    }

    await product.save();

    return res.status(201).json("Product has been successfully created");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const deleteImg = async (req: Request, res: Response) => {
  try {
    const { id: uid } = req.query;

    const product = await Product.findOne({ uid });

    if (!product) return res.status(400).json("Product doesn't exist");

    fs.readdir("./uploads", (_err, files) => {
      files.forEach((file) => {
        if (file === product.image) {
          fs.unlink(`./uploads/${file}`, async function () {
            product.image = "";

            await product.save();
          });
        }
      });
    });

    return res.status(200).json("Image has been successfully removed");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const edit = async (req: Request, res: Response) => {
  const { id: _id, image, parent, modifiers, ...reqData } = req.body;

  try {
    const product: any = await Product.findOne({ _id });

    if (!product) return res.status(400).json("Product doesn't exist");

    Object.keys(reqData).forEach((key) => {
      product[key] = reqData[key];
    });

    if (req.file && !image) {
      product.image = req.file?.filename;
    }

    if (!parent && product.parent) {
      await Product.updateOne(
        { _id: product.parent },
        { $pull: { modifiers: product._id } }
      );

      product.parent = null;
    } else if (parent && !product.parent) {
      await Product.updateOne(
        { _id: parent },
        { $push: { modifiers: product._id } }
      );

      product.parent = parent._id;
    }

    if (modifiers.length) {
      const modifIncoming = modifiers.map(
        (modif: { _id: string; name: string }) =>
          new mongoose.Types.ObjectId(modif._id)
      );
      const modifExisting = product.modifiers;

      if (modifExisting && modifExisting.length !== modifIncoming.length) {
        const missingElems: Types.ObjectId[] = [];

        const longrArr =
          modifExisting.length > modifIncoming.length
            ? modifExisting
            : modifIncoming;
        const shortArr =
          modifExisting.length < modifIncoming.length
            ? modifExisting
            : modifIncoming;

        longrArr.forEach((modifier: Types.ObjectId) => {
          if (!shortArr.includes(modifier)) {
            missingElems.push(modifier);
          }
        });

        const shouldAddNew = modifIncoming.length > modifExisting.length;

        await Product.updateMany(
          { _id: product._id },
          shouldAddNew
            ? {
                $push: {
                  modifiers: { $each: missingElems },
                },
              }
            : {
                $pullAll: {
                  modifiers: missingElems,
                },
              },
          { multi: true }
        );

        await Product.updateMany(
          { _id: { $in: missingElems } },
          { $set: { parent: shouldAddNew ? product._id : null } },
          { multi: true }
        );
      }
    }

    await product.save();

    return res.status(200).json("Product has been successfully updated");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const remove = async (req: Request, res: Response) => {
  const { uid } = req.body;

  try {
    const product = await Product.findOne({ uid });

    if (!product) return res.status(404).json("Product is not found");

    if (product.image) fs.unlinkSync(`./uploads/${product.image}`);

    if (product.isContainer) {
      await Product.updateMany(
        {
          _id: {
            $in: product.modifiers,
          },
        },
        { $unset: { parent: 1 } }
      );
    } else {
      if (product.parent) {
        await Product.findOneAndUpdate(
          { _id: product.parent },
          { $pull: { modifiers: product._id } }
        );
      }
    }

    await product.remove();

    return res.status(200).json("Product has been successfully deleted");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
