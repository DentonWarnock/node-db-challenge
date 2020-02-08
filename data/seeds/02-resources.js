exports.seed = function(knex) {
  return knex("resources").insert([
    { name: "my brain" },
    { name: "computer" },
    { name: "phone" },
    { name: "internet" },
    { name: "pen and paper" }
  ]);
};
