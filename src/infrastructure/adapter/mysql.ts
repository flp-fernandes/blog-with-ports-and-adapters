import database from '../../util/knex';

import {
  type IMysqlAdapter,
  type MysqlAdapterConfig,
  type MysqlDatabase
} from '../../types/infrastructure';

export class MysqlAdapter implements IMysqlAdapter {
  private _tbName: string;
  private readonly database: MysqlDatabase;

  constructor (config?: MysqlAdapterConfig) {
    this.database = config?.dbConn ?? database();
    this._tbName = '';
  }

  get db () {
    return this.database(this._tbName);
  }

  // eslint-disable-next-line accessor-pairs
  set tableName (name: string) {
    this._tbName = name;
  }
}
