import { type Container } from '../types/infrastructure';
import { MysqlAdapter } from './adapter/mysql';
import { PostRepository } from './repository/post';
import { UserRepository } from './repository/user';

export function createContainer (): Container {
  return {
    userRepository: new UserRepository({
      mysqlAdapter: new MysqlAdapter()
    }),

    postRepository: new PostRepository({
      mysqlAdapter: new MysqlAdapter()
    }),
  };
}
