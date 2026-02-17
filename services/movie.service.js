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

export const updateMovieById = async (id, body) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return {
      message: `Movie Updated Successfully.`,
      data: movie,
    };
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return {
        err: err,
        code: 422,
      };
    } else {
      throw error;
    }
  }
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

export const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movie = await Movie.findOne(query);
  if (!movie) {
    return {
      err: "Movie which is queried is not available",
      code: 404,
    };
  } else {
    return {
      data: movie,
    };
  }
};
