const db = require("../data/db-config.js");

module.exports = {
  getResources,
  getResourcesById,
  insertResource
};

function getResources() {
  return db("resources").select();
}

function getResourcesById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function insertResource(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => {
      return db("resources")
        .where({ id })
        .first();
    });
}
