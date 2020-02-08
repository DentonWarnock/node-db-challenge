const express = require("express");

const Resources = require("./resource-model");

const router = express.Router();

router.get("/", (req, res) => {
  Resources.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get resources" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Resources.getResourcesById(id)
    .then(resources => {
      if (resources) {
        res.status(200).json(resources);
      } else {
        res
          .status(404)
          .json({ message: "Could not find resources with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get resources" });
    });
});

router.post("/", (req, res) => {
  const { id } = req.params;
  if (!req.body.name) {
    res.status(400).json({ error: "Please provide resource name" });
  } else {
    Resources.insertResource(req.body)
      .then(resource => {
        res.status(201).json(resource);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to add resource" });
      });
  }
});

module.exports = router;
