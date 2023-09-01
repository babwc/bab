import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const GallerySchema = mongoose.model("GallerySchema", gallerySchema);

export default GallerySchema;
