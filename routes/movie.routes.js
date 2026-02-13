import {
  createMovies,
  getMovieDetails,
  deleteMovie,
} from "../controllers/movie.controller.js";

export const routes = (app) => {
  app.post("/mba/api/v1/movies", createMovies);
  app.get("/mba/api/v1/movies/:id", getMovieDetails);
  app.delete("/mba/api/v1/movies/:id", deleteMovie);
};
