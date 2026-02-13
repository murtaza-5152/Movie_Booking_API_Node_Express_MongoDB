import { response } from "express";
import {
  successResponseBody,
  errorResponseBody,
} from "../utils/reponseBody.js";
import {
  createNewMovie,
  getMovieById,
  deleteMovieById,
} from "../services/movie.service.js";

/**
 *
 * @param {*} req {name , description,...etc}
 * @param {*} res {res.data}
 * @returns movie data
 */

export const createMovies = async (req, res) => {
  try {
    const response = await createNewMovie(req?.body);
    if (response.code === 404) {
      errorResponseBody.message = response?.message;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response?.data;
    successResponseBody.message = response?.message;
    return res.status(201).json(successResponseBody);
  } catch (err) {
    res.status(500).json(errorResponseBody);
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const response = await getMovieById(req?.params?.id);
    if (response.code === 404) {
      errorResponseBody.message = response?.message;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response?.data;
    successResponseBody.message = response?.message;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    res.status(500).json(errorResponseBody);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const response = await deleteMovieById(req?.params?.id);
    if (response.code === 404) {
      errorResponseBody.message = response?.message;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response?.data;
    successResponseBody.message = response?.message;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.message = response?.message;
    res.status(response.code).json(errorResponseBody);
  }
};
