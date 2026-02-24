import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Theater = mongoose.model("Theater", theaterSchema);
