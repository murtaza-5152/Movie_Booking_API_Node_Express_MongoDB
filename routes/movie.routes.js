import { createMovies } from "../controllers/movie.controller.js";

export const routes = (app) => {
  console.log("routes");
  app.post("/mba/api/v1/movies", createMovies);
};
