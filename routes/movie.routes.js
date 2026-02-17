import {
  createMovies,
  getMovieDetails,
  deleteMovie,
  updateMovie,
} from "../controllers/movie.controller.js";
import { createMovieValidation } from "../middlewares/movie.middleware.js";
// middleware to check the movie validations before calling to network.

export const routes = (app) => {
  app.post("/mba/api/v1/movies", createMovieValidation, createMovies); // second parameter is middleware.
  app.get("/mba/api/v1/movies/:id", getMovieDetails);
  app.delete("/mba/api/v1/movies/:id", deleteMovie);
  app.put("/mba/api/v1/movies/:id", updateMovie); // used to updates all required parameters.
  app.patch("/mba/api/v1/movies/:id", updateMovie); // used for the updates partial parameters.
};
