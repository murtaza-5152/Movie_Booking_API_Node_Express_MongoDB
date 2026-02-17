import { Schema } from "mongoose";
import {
  createNewMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  fetchMovies,
} from "../services/movie.service.js";

import {
  successResponseBody,
  errorResponseBody,
} from "../utils/reponseBody.js";

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

export const updateMovie = async (req, res) => {
  try {
    const response = await updateMovieById(req?.params?.id, req?.body);
    console.log("response", response);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = `The updates we are trying to apply doesn't validate the Schemas`;
      return err.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response?.data;
    successResponseBody.message = response?.message;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log("error in controller", err);
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
    res.status(500).json(errorResponseBody);
  }
};

export const getMovie = async (req, res) => {
  try {
    const response = await fetchMovies(req.query);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response?.data;
    successResponseBody.message = response?.message;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};
