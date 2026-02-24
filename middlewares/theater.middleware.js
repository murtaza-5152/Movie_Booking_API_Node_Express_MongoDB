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
