// import { Request, Response } from "express";

// import ShortUniqueId from "short-unique-id";

// import CateringCategory from "../model/CateringCaterory";

// export const all = async (_req: Request, res: Response) => {
//   try {
//     const cateringCtg = await CateringCategory.find().select("_id name dishes");

//     return res.status(200).json(cateringCtg);
//   } catch (error) {
//     return res.status(500).json("Something went wrong");
//   }
// };

// export const add = async (req: Request, res: Response) => {
//   const { name } = req.body;

//   try {
//     if (name.length < 2) {
//       return res
//         .status(400)
//         .json("This field must contain at least 2 characters");
//     }
//     const uid = new ShortUniqueId({ length: 10 });

//     await new CateringCategory({
//       id: uid(),
//       name,
//       dishes: [],
//     }).save();

//     return res
//       .status(201)
//       .json("Catering category has been successfully created");
//   } catch (error) {
//     return res.status(500).json("Something went wrong");
//   }
// };

// export const remove = async (req: Request, res: Response) => {
//   const { id: _id } = req.body;

//   try {
//     const cateringCtg = await CateringCategory.findOne({ _id });

//     if (cateringCtg?.dishes.length)
//       return res.status(400).json("Category must contain no dishes");

//     await cateringCtg?.delete();

//     res.status(200).json("Category successfully deleted");
//   } catch (error) {
//     return res.status(500).json("Something went wrong");
//   }
// };
