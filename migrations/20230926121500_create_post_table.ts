/* eslint-disable linebreak-style */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post', (t) => {
    t.increments('id');
    t.integer('userId').unsigned().references('id').inTable('user');
    t.text('text', 'string').notNullable();
    t.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post');
}

