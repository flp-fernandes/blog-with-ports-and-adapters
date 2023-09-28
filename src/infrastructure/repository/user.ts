import R from 'ramda';
import { type IMysqlAdapter } from '../../types/infrastructure';
import { type IUserRepository, type User } from '../../types/user';
import { DuplicateUserEmail, FailedToFindUser, FailedToSaveUser, InvalidUserToFind } from '../../util/error';
import { Logger } from '../../util/logger';

export interface UserRepositoryContext {
  mysqlAdapter: IMysqlAdapter;
}

export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private readonly mysqlAdapter: IMysqlAdapter;

  constructor ({ mysqlAdapter }: UserRepositoryContext) {
    this.mysqlAdapter = mysqlAdapter;
    this.mysqlAdapter.tableName = 'user';
  }
	
  async saveUser (user: User): Promise<User> {
    try {
      const [isUserCreated] = await this.mysqlAdapter.db.insert({ ...user }).onConflict('email').ignore();

      if (!isUserCreated) {
        throw new DuplicateUserEmail('Failed to save user at database');
      }

      const createdUser = await this.mysqlAdapter.db.select().where({ email: user.email }).first();
			
      this.logger.console().info('Created user on database');
			
      return createdUser;
    } catch (error) {
      if (error instanceof DuplicateUserEmail) {
        this.logger.console().error('Duplicate entry');
				
        throw error;
      }
			
      this.logger.console().error(`Failed to save user at database. Error: ${error}`);
			
      throw new FailedToSaveUser('Failed to save user at database');
    }
  }
	
  async find (params: Partial<User>): Promise<User[]> {
    try {
      const {
        id,
        name,
        email,
      } = params;

      console.log(params);

      const qb = this.mysqlAdapter.db;

      if (id) {
        qb.where({ id });
      }

      if (name) {
        qb.where({ name });
      }

      if (email) {
        qb.where({ email });
      }

      const queryResult = await qb;

      if (R.isEmpty(queryResult)) {
        throw new InvalidUserToFind('User not found');
      }

      this.logger.console().info('Find user data');

      return queryResult;
    } catch (error) {
      const defaultMessage = 'Failed to find user';
      const message = R.pathOr(defaultMessage, ['sqlMessage'], error);

      this.logger.console().error(`Failed to find user at database. ${error}`);

      throw new FailedToFindUser(message);
    }
  }
}
