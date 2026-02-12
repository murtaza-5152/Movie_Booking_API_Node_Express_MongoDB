import { Movie } from "../models/movie.model.js";

/**
 *
 * @param {*} req {name , description,...etc}
 * @param {*} res {res.data}
 * @returns movie data
 */
export const createMovies = async (req, res) => {
  console.log("inside creatMovie Controller", req.body);
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      data: movie,
      message: "New Movie Added Successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal Server Error",
    });
  }
};
