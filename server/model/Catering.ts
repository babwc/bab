import mongoose from "mongoose";

const cateringSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String },
    category: { type: String, required: true },
    image: { type: String || null },
    description: String,
  },
  { timestamps: true, versionKey: false }
);

const Catering = mongoose.model("Catering", cateringSchema);

export default Catering;
