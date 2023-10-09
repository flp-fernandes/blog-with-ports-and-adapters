import { type UseCaseContext } from '../../types/core';
import { type IUserUseCase, type User } from '../../types/user';
import { Encryption } from '../../util/encryption';
import { Logger } from '../../util/logger';
import { validateProperties } from './schemas/shared';
import { createUserSchema } from './schemas/user';

export class UserUseCase implements IUserUseCase {
  private readonly logger = new Logger(UserUseCase.name);
  private readonly userService: UseCaseContext['userService'];
  private readonly encrypt = new Encryption();

  constructor(ctx: UseCaseContext) {
    this.userService = ctx.userService;
  }

  async createUser(params: User): Promise<Partial<User>> {
    validateProperties({
      schema: createUserSchema,
      params,
      errorMsg: 'Invalid properties to create user',
    });

    console.log(params.password);

    params.password = this.encrypt.encrypt(params.password);

    console.log(this.encrypt.decrypt(params.password));

    const user = await this.userService.saveUser({ ...params });

    this.logger.console().info('Created user');

    return user;
  }

  find(params: Partial<User>): Promise<User[]> {
    return this.userService.find(params);
  }
}
