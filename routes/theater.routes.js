import {
  createNewTheater,
  getTheaterById,
  updateTheaterById,
  deleteTheaterById,
  updateMovies,
} from "../controllers/theater.controller.js";
import {
  createTheaterMiddleware,
  validUpdateMovies,
} from "../middlewares/theater.middleware.js";

export const routes = (app) => {
  app.post("/mba/api/v1/theater", createTheaterMiddleware, createNewTheater);
  app.get("/mba/api/v1/theater/:id", getTheaterById);
  app.put("/mba/api/v1/theater/:id", updateTheaterById);
  app.delete("/mba/api/v1/theater/:id", deleteTheaterById);
  app.patch("/mba/api/v1/theater/:id/movies", validUpdateMovies, updateMovies);
};
