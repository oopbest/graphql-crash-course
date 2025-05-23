import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    gender: { type: String, enum: ["male", "female"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
