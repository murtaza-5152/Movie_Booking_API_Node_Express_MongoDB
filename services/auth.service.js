import { User } from '../models/user.model.js';

export const CreateUser = async (data) => {
  try {
    var response = await User.create(data);
    return response;
  } catch (error) {
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: 422 };
    }
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw {
        err: 'No User Found for the given email id',
        code: 404,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
