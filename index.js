import express from "express";
import env from "dotenv/config";
import mongoose from "mongoose";
import { routes as MovieRoutes } from "./routes/movie.routes.js";
const app = express(); // app is an express object.
// env.config();
/*
This parses form data (from HTML forms).
*/
app.use(express.urlencoded({ extended: true }));

/*
If the incoming request body is JSON, parse it and put it inside req.body.
 */
app.use(express.json());
MovieRoutes(app); // invoking the MovieRoutes

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
