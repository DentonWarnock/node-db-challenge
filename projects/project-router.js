const express = require("express");

const Projects = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res
          .status(404)
          .json({ message: "Could not find projects with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;

  Projects.getTasksById(id)
    .then(task => {
      if (task.length) {
        res.json(task);
      } else {
        res
          .status(404)
          .json({ message: "Could not find tasks for given scheme" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.post("/", (req, res) => {
  const { id } = req.params;
  if (!req.body.name) {
    res.status(400).json({ error: "Please provide project name" });
  } else {
    Projects.insertProject(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get project" });
      });
  }

  router.post("/:id/tasks", (req, res) => {
    const { id } = req.params;
    if (!req.body.description) {
      res.status(400).json({ error: "Please provide task description" });
    } else {
      const newTask = {
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed,
        project_id: id
      };
      Projects.insertTask(newTask)
        .then(task => {
          res.status(201).json(task);
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to get task" });
        });
    }
  });
});

module.exports = router;
