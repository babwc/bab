import mongoose from "mongoose";

const cateringOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "CateringCategory" },
    image: { type: String || null },
    description: String,
  },
  { timestamps: true, versionKey: false }
);

const CateringOreder = mongoose.model("CateringOrder", cateringOrderSchema);

export default CateringOreder;
