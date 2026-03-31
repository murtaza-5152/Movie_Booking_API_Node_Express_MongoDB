import { badRequestResponse } from '../utils/reponseBody.js';

export const ValidateAuthentication = (req, res, next) => {
  let { name, email, password } = req?.body;

  if (!name) {
    badRequestResponse.message = 'Username is required.';
    return res.status(400).json(badRequestResponse);
  }

  if (!email) {
    badRequestResponse.message = 'Email is required.';
    return res.status(400).json(badRequestResponse);
  }

  if (!password) {
    badRequestResponse.message = 'Password is required.';
    return res.status(400).json(badRequestResponse);
  }
  next();
};
