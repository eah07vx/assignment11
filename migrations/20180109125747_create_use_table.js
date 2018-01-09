
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hobbies', function (t) {
    t.increments('id').primary();
    t.string('firstName').notNullable();
    t.string('lastName').notNullable();
    t.string('hobby').notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('hobbies');
};
