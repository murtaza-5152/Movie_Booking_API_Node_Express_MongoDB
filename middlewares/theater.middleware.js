import { badRequestResponse } from "../utils/reponseBody.js";

export const createTheaterMiddleware = async (req, res, next) => {
  if (!req.body.name) {
    badRequestResponse.message =
      "The name of theater is not present in the request";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.city) {
    badRequestResponse.message = "The city is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.pincode) {
    badRequestResponse.message = "The pincode is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  next();
};

export const validUpdateMovies = (req, res, next) => {
  if (!req.body.movieIds) {
    badRequestResponse.message = "The movie IDs are not present in the request";
    return res.status(400).json(badRequestResponse);
  }

  if (req.body.insert == undefined) {
    badRequestResponse.message =
      "The insert parameter is missing in the request";
    return res.status(400).json(badRequestResponse);
  }

  if (!(req.body.movieIds instanceof Array)) {
    badRequestResponse.message =
      "Expected array of movie ids but found something else";
    return res.status(400).json(badRequestResponse);
  }
  if (req.body.movieIds.length == 0) {
    badRequestResponse.message = "No Movies present in the array provided";
    return res.status(400).json(badRequestResponse);
  }
  next();
};
