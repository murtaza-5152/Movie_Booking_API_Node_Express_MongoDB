import { Theater } from "../models/theater.model.js";

export const createTheater = async (body) => {
  try {
    const theater = await Theater.create(body);
    return {
      message: `${theater.name} Created Successfully.`,
      data: theater,
    };
  } catch (err) {
    return {
      err: err?.message,
      code: 404,
    };
  }
};

export const getTheater = async (id) => {
  const theater = await Theater.findById(id);
  if (!theater) {
    return {
      err: "Requested Theater not present",
      code: 404,
    };
  }
  return {
    message: "Successfully get a details of theater",
    data: theater,
  };
};

export const updateTheater = async (id, body) => {
  try {
    const theater = await Theater.findByIdAndUpdate(id, body, { new: true });
    if (!theater) {
      return {
        err: "Requested Theater not present",
        code: 404,
      };
    }
    return {
      message: "Successfully updated the details of theater",
      data: theater,
    };
  } catch (error) {
    return {
      err: error?.message,
      code: 404,
    };
  }
};

export const deleteTheater = async (id) => {
  try {
    const theater = await Theater.findByIdAndDelete(id);
    if (!theater) {
      return {
        err: "Requested Theater not present",
        code: 404,
      };
    }
    return {
      message: "Successfully Deleted the Theater",
      data: theater,
    };
  } catch (error) {
    return {
      err: error?.message,
      code: 404,
    };
  }
};

export const updateMoviesInTheaters = async (theaterId, movieIds, insert) => {
  const theater = await Theater.findById(theaterId);
  if (!theater) {
    return {
      err: "No Such Theater found with the given id",
      code: 404,
    };
  }
  if (insert) {
    // we need to add movies
    movieIds.forEach((id) => {
      console.log("CONSOLE", theater.movies.includes(id));
      if (!theater.movies.includes(id)) {
        console.log("TREU");
        theater.movies.push(id);
      } else {
        return {
          err: "Movie is already present in the theater",
          code: 4040,
        };
      }
    });
  } else {
    // we need to remove movie
    let savedMovieIds = theater.movies;
    movieIds.forEach((id) => {
      savedMovieIds = savedMovieIds.filter((smi) => smi === id);
    });
    theater.movies = savedMovieIds;
  }
  await theater.save();
  return theater.populate("movies"); // collection name
};
