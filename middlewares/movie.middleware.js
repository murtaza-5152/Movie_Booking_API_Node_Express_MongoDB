import { badRequestResponse } from "../utils/reponseBody.js";

export const createMovieValidation = async (req, res, next) => {
  if (!req.body.name) {
    badRequestResponse.message =
      "The name of movie is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.name) {
    badRequestResponse.message =
      "The name of movie is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.description) {
    badRequestResponse.message =
      "The description is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (
    !req.body.casts ||
    !(req.body.casts instanceof Array) ||
    req.body.casts.length <= 0
  ) {
    badRequestResponse.message = "The casts is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.trailerUrl) {
    badRequestResponse.message =
      "The trailer-url is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.language) {
    badRequestResponse.message = "The language is not present in the request";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.releaseDate) {
    badRequestResponse.message =
      "The release date is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.director) {
    badRequestResponse.message = "The director is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.releaseStatus) {
    badRequestResponse.message =
      "The release status is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  next();
};
