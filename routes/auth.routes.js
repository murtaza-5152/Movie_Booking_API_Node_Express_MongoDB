import { Signup } from '../controllers/auth.controller.js';

export const routes = async (app) => {
  app.post('/mba/api/v1/auth/signup', Signup);
};
