import { Router } from 'express';
import User from './app/models/User';

import UserController from './app/models/controllers/UserController';
import SessionController from './app/models/controllers/SessionController';

import authMiddleWare from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleWare);
routes.put('/users', UserController.update);

module.exports = routes;
