import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import { Movie } from "./models/movie.model.js";

const app = express(); // app is an express object.
env.config();

app.get("/", (req, res) => {
  res.send({
    message: "Success",
  });
});

app.listen(process.env.PORT, async () => {
  // this callback gets executed, once we successfully start the server on given port.
  console.log(`Server is Started on port ${process.env.PORT}`);

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully");
    await Movie.create({
      name: "Malamal Weekly",
      description: "Comedy Action",
      casts: ["Salman khan", "Anuskha Sharma", "Preeti Jinta"],
      trailerUrl: "https://www.google.com",
      language: "Hindi",
      releaseData: "02/10/1994",
      director: "Arbaaz Khan",
      releaseStatus: "RELEASED",
    });
  } catch (err) {
    console.log("Not be able to connect to Database : ", err);
  }
});
