exports.seed = function(knex) {
  return knex("tasks").insert([
    { description: "study", notes: "take breaks", project_id: 1 },
    {
      description: "clean up and do the dishes",
      notes: "do before the weekend!",
      project_id: 2
    },
    {
      description: "complete application and submit",
      notes: "double check resume",
      project_id: 3
    }
  ]);
};
