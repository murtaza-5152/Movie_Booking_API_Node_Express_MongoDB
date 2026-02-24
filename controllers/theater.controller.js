import {
  createTheater,
  getTheater,
  updateTheater,
  deleteTheater,
  updateMoviesInTheaters,
} from "../services/theater.service.js";
import {
  successResponseBody,
  errorResponseBody,
} from "../utils/reponseBody.js";

export const createNewTheater = async (req, res) => {
  try {
    const response = await createTheater(req.body);
    if (response.err) {
      errorResponseBody.message = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    console.log("Response", response);
    successResponseBody.message = response.message;
    successResponseBody.data = response.data;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const response = await getTheater(req?.params?.id);
    if (response.err) {
      errorResponseBody.message = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.message = response.message;
    successResponseBody.data = response.data;
    console.log("Response", response);
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

export const updateTheaterById = async (req, res) => {
  try {
    const response = await updateTheater(req?.params?.id, req?.body);
    if (response.err) {
      errorResponseBody.message = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.message = response.message;
    successResponseBody.data = response.data;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

export const deleteTheaterById = async (req, res) => {
  try {
    const response = await deleteTheater(req?.params?.id);
    if (response.err) {
      errorResponseBody.message = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.message = response.message;
    successResponseBody.data = response.data;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

export const updateMovies = async (req, res) => {
  try {
    const response = await updateMoviesInTheaters(
      req.params.id,
      req.body.movieIds,
      req.body.insert,
    );
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movies in the theater";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
