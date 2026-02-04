import express from "express";
import env from "dotenv";
import mongoose from "mongoose";

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
  } catch (err) {
    console.log("Not be able to connect to Database : ", err);
  }
});
