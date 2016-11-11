exports.up = function(knex, Promise) {
  return knex.schema.createTable('collections', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.unique('name');
  });
};

exports.down = function(knex, Promise) {

};
