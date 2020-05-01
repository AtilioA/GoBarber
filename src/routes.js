import { Router } from 'express';
import User from './app/models/User';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleWare from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});
routes.use(authMiddleWare);

routes.put('/users', UserController.update);

module.exports = routes;
