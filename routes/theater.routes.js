import {
  createNewTheater,
  getTheaterById,
  updateTheaterById,
  deleteTheaterById,
} from "../controllers/theater.controller.js";
import { createTheaterMiddleware } from "../middlewares/theater.middleware.js";

export const routes = (app) => {
  app.post("/mba/api/v1/theater", createTheaterMiddleware, createNewTheater);
  app.get("/mba/api/v1/theater/:id", getTheaterById);
  app.put("/mba/api/v1/theater/:id", updateTheaterById);
  app.delete("/mba/api/v1/theater/:id", deleteTheaterById);
};
