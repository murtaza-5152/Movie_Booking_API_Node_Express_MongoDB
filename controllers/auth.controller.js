import { CreateUser } from '../services/auth.service.js';
import {
  errorResponseBody,
  successResponseBody,
} from '../utils/reponseBody.js';

export const Signup = async (req, res) => {
  try {
    const response = await CreateUser(req?.body);
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully Register a New User';
    return res.status(200).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
