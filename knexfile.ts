import { env } from './src/util/env';
import { Logger } from './src/util/logger';

const logger = new Logger('Knexfile');

module.exports = {
  client: 'mysql2',
  debug: env.mysqlDebug || false,
  connection: {
    host: env.mysqlHost,
    port: env.mysqlPort,
    user: env.mysqlUser,
    password: env.mysqlPassword,
    database: env.mysqlSchema,
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    dateStrings: true,
  },
  pool: {
    min: env.mysqlPoolMin,
    max: env.mysqlPoolMax,
    afterCreate: function _(connection: any, done: Function) {
      connection.query('SET time_zone = "UTC";', function er(err: Error) {
        if (err) {
          logger.console().warn(`Failed to initialize mysql database connection: ${err}`);
        } else {
          logger.console().debug('Mysql database connected');
        }
        done(err, connection);
      });
    },
  }
};