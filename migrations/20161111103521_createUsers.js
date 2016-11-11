exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('username');
    t.string('password');
    t.unique('username');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
