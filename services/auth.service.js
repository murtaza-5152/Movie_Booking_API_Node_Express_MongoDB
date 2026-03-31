import { User } from '../models/user.model.js';

export const CreateUser = async (data) => {
  try {
    var response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
