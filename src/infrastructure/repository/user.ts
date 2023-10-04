/* eslint-disable @typescript-eslint/no-explicit-any */
import R from 'ramda';
import { IMysqlAdapter } from '../../types/infrastructure';
import { IUserRepository, User } from '../../types/user';
import {
  /*DuplicateUserEmail,*/
  FailedToFindUser,
  FailedToSaveUser,
  InvalidUserToFind
} from '../../util/error';
import { Logger } from '../../util/logger';
import { DataError, checkAndThrowUserError } from './util/check-error';

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
      await this.mysqlAdapter.db.insert({ ...user });

      const createdUser = await this.mysqlAdapter.db.select().where({ email: user.email }).first();
			
      this.logger.console().info('Created user on database');
			
      return createdUser;
    } catch (error) {
      checkAndThrowUserError(error as DataError);

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
