exports.up = async function(knex) {
  await knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("description", 500);
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
  });
  await knex.schema.createTable("resources", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("description", 500);
  });
  await knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl.string("description", 500).notNullable();
    tbl.string("notes", 500);
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
    tbl
      .integer("project_id")
      .notNullable()
      .references("projects.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
  await knex.schema.createTable("projects_resources", tbl => {
    tbl
      .integer("project_id")
      .notNullable()
      .references("projects.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("resource_id")
      .notNullable()
      .references("resources.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.primary(["project_id", "resource_id"]);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("projects_resources");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("projects");
};
