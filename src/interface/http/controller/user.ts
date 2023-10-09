import { NextFunction } from 'express';
import {
  HttpControllerConfig,
  HttpRequest,
  HttpResponse,
  HttpRouter,
  IHttpRoute,
} from '../../../types/interface';
import { User } from '../../../types/user';
import { createUserSchema, findUserSchema } from '../schema/user';
import { Logger } from '../../../util/logger';

export class UserController implements IHttpRoute {
  private readonly logger = new Logger(UserController.name);
  private readonly _validator: HttpControllerConfig['validator'];
  private readonly userUseCase: HttpControllerConfig['coreContainer']['userUseCase'];

  constructor({ coreContainer, validator }: HttpControllerConfig) {
    this._validator = validator;
    this.userUseCase = coreContainer.userUseCase;
  }

  register(router: HttpRouter): void {
    router
      .route('/v1/user')
      .post(this._validator(createUserSchema), this.createUser.bind(this))
      .get(this._validator(findUserSchema), this.findUser.bind(this));
  }

  async createUser(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    try {
      this.logger.console().info('Start user creation');

      const { name, email, password } = req.body;

      const user: User = {
        name,
        email,
        password,
      };

      const userCreated = await this.userUseCase.createUser(user);

      this.logger.console().info('End user creation');

      res.status(200).send({ ...userCreated });
    } catch (error) {
      this.logger.console().error(`Create user error: ${error}`);

      next(error);
    }
  }

  async findUser(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    try {
      this.logger.console().info('Start find user');

      const { id, name, email } = req.query;

      const user = {
        id: typeof id == 'string' ? parseInt(id, 10) : undefined,
        name,
        email,
      } as unknown as Partial<User>;

      const result = await this.userUseCase.find(user);

      this.logger.console().info('Found user');

      res.status(200).send(result);
    } catch (error) {
      this.logger.console().error(`Find user error: ${error}`);

      next(error);
    }
  }
}
