import { Theater } from '../models/theater.model.js';
import { Movie } from '../models/movie.model.js';

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
      err: 'Requested Theater not present',
      code: 404,
    };
  }
  return {
    message: 'Successfully get a details of theater',
    data: theater,
  };
};

export const updateTheater = async (id, body) => {
  try {
    const theater = await Theater.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }); // new: true, for get new updated data, and runValidators is used to check the validation from middleware.
    if (!theater) {
      return {
        err: 'Requested Theater not present',
        code: 404,
      };
    }
    return {
      message: 'Successfully updated the details of theater',
      data: theater,
    };
  } catch (error) {
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    throw error;
  }
};

export const deleteTheater = async (id) => {
  try {
    const theater = await Theater.findByIdAndDelete(id);
    if (!theater) {
      return {
        err: 'Requested Theater not present',
        code: 404,
      };
    }
    return {
      message: 'Successfully Deleted the Theater',
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
  var theater = await Theater.findById(theaterId);
  if (!theater) {
    return {
      err: 'No Such Theater found with the given id',
      code: 404,
    };
  }
  if (insert) {
    // we need to add movies, only one entry is present in the DB.
    theater = await Theater.findByIdAndUpdate(
      { _id: theaterId },
      { $addToSet: { movies: { $each: movieIds } } },
      { new: true },
    );
  } else {
    // we need to remove movie
    theater = await Theater.findByIdAndUpdate(
      { _id: theaterId },
      { $pull: { movies: { $in: movieIds } } },
      { new: true },
    );
  }
  return theater.populate('movies');
};

export const getAllTheaters = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data?.city) {
      // this check whether city is present is query params or not
      query.city = data?.city?.charAt(0)?.toUpperCase() + data?.city?.slice(1);
    }
    if (data && data.pincode) {
      // this check whether pincode is present is query params or not
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      // this check whether name is present is query params or not
      query.name = data?.name?.charAt(0)?.toUpperCase() + data?.name?.slice(1);
    }
    if (data && data.movieId) {
      query.movies = { $all: data.movieId };
    }
    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theater.find(query, {}, pagination);
    return response;
  } catch (error) {
    console.log(error);
    throw error?.message;
  }
};

export const getMoviesInTheater = async (id) => {
  try {
    const theater = await Theater.findById(id, { name: 1, movies: 1 }).populate(
      'movies',
    );
    if (!theater) {
      return {
        err: 'Requested Theater not present',
        code: 404,
      };
    }
    return {
      message: 'Successfully get a details of theater',
      data: theater,
    };
  } catch (error) {
    throw error;
  }
};
