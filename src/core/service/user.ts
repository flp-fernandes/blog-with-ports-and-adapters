import { type ServiceContext } from '../../types/core';
import { type IUserService, type User } from '../../types/user';
import { Logger } from '../../util/logger';

export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  private readonly userRepository: ServiceContext['userRepository'];

  constructor (ctx: ServiceContext) {
    this.userRepository = ctx.userRepository;
  }
	
  async saveUser (user: User): Promise<User> {
    this.logger.console().info('Called repository');
		
    return await this.userRepository.saveUser(user);
  }
	
  find (params: Partial<User>): Promise<User[]> {
    return this.userRepository.find(params);
  }
}
