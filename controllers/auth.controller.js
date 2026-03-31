import jwt from 'jsonwebtoken';
import { CreateUser, getUserByEmail } from '../services/auth.service.js';
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

export const Signin = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw { err: 'Invalid Password for the given email', code: 401 };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: '1h' },
    );

    successResponseBody.message = 'Successfully Logged';
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token,
    };
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
