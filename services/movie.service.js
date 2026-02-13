import { Movie } from "../models/movie.model.js";

export const createNewMovie = async (body) => {
  try {
    const movie = await Movie.create(body);
    return {
      message: `${movie.name} Created Successfully.`,
      data: movie,
    };
  } catch (err) {
    return {
      message: err?.message,
      code: 404,
    };
  }
};

export const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    return {
      message: "Movie is not present of given id",
      code: 404,
    };
  }
  return {
    message: `Details of ${movie.name} Fetched Successfully.`,
    data: movie,
  };
};

export const deleteMovieById = async (id) => {
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return {
      message: "Movie is not present of given id",
      code: 404,
    };
  }
  return {
    message: `Details of ${movie.name} Deleted Successfully.`,
    data: movie,
  };
};
