import knex, { type Knex } from 'knex';

import knexfile = require('../../knexfile')

let db: Knex;

export default function getDbConn (): Knex {
  if (!db) {
    db = knex(knexfile);
  }

  return db;
}
