import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import routes from './routes';
import './database';
import loggingMiddleware from './app/middlewares/logging';

class App {
  constructor() {
    this.server = express();

    // Sentry.init(sentryConfig);

    this.server.use;

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(loggingMiddleware);
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    // this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
