exports.seed = function(knex) {
  return knex("projects").insert([
    { name: "study" },
    { name: "house chores" },
    { name: "apply for internship" }
  ]);
};
