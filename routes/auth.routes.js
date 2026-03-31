import { Signup, Signin } from '../controllers/auth.controller.js';
import { ValidateAuthentication } from '../middlewares/auth.middleware.js';

export const routes = async (app) => {
  app.post('/mba/api/v1/auth/signup', ValidateAuthentication, Signup);
  app.post('/mba/api/v1/auth/signin', Signin);
};
