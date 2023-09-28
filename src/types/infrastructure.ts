import { type Knex } from 'knex';
import { type IUserRepository } from './user';
import { IPostRespository } from './post';

/* MySQL Adapter */
export type MysqlDatabase = Knex;

export interface MysqlAdapterConfig {
  dbConn: MysqlDatabase;
}

export interface IMysqlAdapter {
  db: Knex.QueryBuilder;
  tableName: string;
}

/* Infrastructure */
export interface Container {
  userRepository: IUserRepository;
  postRepository: IPostRespository;
}
