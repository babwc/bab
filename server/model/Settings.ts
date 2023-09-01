import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    setting: { type: String, required: true },
    mode: { type: Number, required: true },
  },
  { versionKey: false }
);

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
