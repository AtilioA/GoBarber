import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import loggingMiddleware from './app/middlewares/logging';

import FileController from './app/controllers/FileController';

import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/ProviderController';

import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.use(loggingMiddleware);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.use(authMiddleware);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:appointmentId', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);

routes.put('/users', UserController.update);

module.exports = routes;
