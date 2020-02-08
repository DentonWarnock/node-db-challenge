const db = require("../data/db-config.js");

module.exports = {
  getProjects,
  getProjectById,
  getTasksById,
  insertProject,
  insertTask
};

function getProjects() {
  return db("projects").select();
}

// function getProjectById(id) {
//   return db("projects")
//     .where({ id })
//     .first();
// }

function getProjectById(id) {
  return (
    db("projects as p")
      .join("tasks as t", "t.project_id", "p.id")
      // .join("projects_resources as pr", "pr.resource_id", "p.id")
      .where({ project_id: id })
      .select(
        "p.id",
        "p.name as name",
        "p.description as description",
        "p.completed",
        "t.*"
        // "pr.*"
      )
  );
}

function getTasksById(project_id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id })
    .select(
      "t.id",
      "p.name as project_name",
      "p.description as project_description",
      "t.description",
      "t.notes",
      "t.completed"
    );
}

function insertProject(project) {
  return db("projects")
    .insert(project)
    .then(([id]) => {
      return db("projects")
        .where({ id })
        .first();
    });
}

function insertTask(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => {
      return db("tasks")
        .where({ id })
        .first();
    });
}
