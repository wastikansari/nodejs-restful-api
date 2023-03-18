import mongoose from "mongoose";
const Schema = mongoose.Schema;


const noteList = mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    notes: [noteList],
    // {type: Array, "default": [], _id: true, timestamps:true },
  },
  { timestamps: true, _id: true }
);

export default mongoose.model("User", userSchema, "users");
