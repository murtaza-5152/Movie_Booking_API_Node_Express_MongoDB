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
