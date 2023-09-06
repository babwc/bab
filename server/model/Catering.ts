import mongoose from "mongoose";

interface ICatering {
  name: string;
  price?: string;
  category: string;
  image: string;
  imageUrl?: string;
}

const cateringSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // price: { type: String },
    category: { type: String, required: true },
    image: { type: String || null },
    description: String,
  },
  { timestamps: true, versionKey: false }
);

const Catering = mongoose.model<ICatering>("Catering", cateringSchema);

export default Catering;
