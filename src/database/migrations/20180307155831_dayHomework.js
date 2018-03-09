exports.up = function(knex, Promise) {
  return knex.schema.createTable("days", table => {
    table.increments();
    table.integer("day");
    table.boolean("homework");
    table.boolean("attendance");
    return table;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("days");
};
