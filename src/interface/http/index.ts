import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { type Container } from '../../types/core';
import { type IHttpInterface, type IHttpRoute } from '../../types/interface';
import { UserController } from './Controller/user';
import { errorHandler } from './middleware/errorHandler';
import { validator } from './middleware/validator';
import { PostController } from './Controller/post';

interface Config {
  env: typeof import('../../util/env').env
  coreContainer: Container
}

export class HttpInterface implements IHttpInterface {
  private app?: express.Application;
  private readonly coreContainer: Config['coreContainer'];
  private readonly env: Config['env'];

  constructor (config: Config) {
    this.coreContainer = config.coreContainer;
    this.env = config.env;
  }

  initApp () {
    this.app = express();

    this.app.use(
      helmet(),
      cors(),
      compression(),
      express.json({
        limit: this.env.httpBodyLimit
      })
    );

    this.setupRoutes();
    this.setupNotFound();

    this.app.use(errorHandler);
  }

  setupRoutes () {
    [
      new UserController({
        coreContainer: this.coreContainer,
        validator
      }),

      new PostController({
        coreContainer: this.coreContainer,
        validator
      })
    ].forEach((route: IHttpRoute) => {
      const router = express.Router({ mergeParams: true });
      route.register(router);
      this.app?.use(router);
    });
  }

  setupNotFound () {
    this.app?.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new Error('Page not found'));
      }
    );
  }

  serve (): void {
    this.initApp();

    this.app?.listen(this.env.httpPort);
  }
}
