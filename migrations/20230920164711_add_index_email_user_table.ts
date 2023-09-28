import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('user', (t) => {
    t.index('email', 'idx_email');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('user', (t) => {
    t.dropIndex('email', 'idx_email');
  })
}

