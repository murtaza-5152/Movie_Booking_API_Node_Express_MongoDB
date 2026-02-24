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
    movies: {
      type: [mongoose.Schema.Types.ObjectId], // used to associated the movies with theater
      ref: "Movie",
    },
  },
  { timestamps: true },
);

export const Theater = mongoose.model("Theater", theaterSchema);
