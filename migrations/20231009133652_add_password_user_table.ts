import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('user', (t) => {
    t.string('password', 255).notNullable().after('email');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('user', (t) => {
    t.dropColumn('password');
  });
}
