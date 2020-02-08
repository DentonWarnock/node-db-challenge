const express = require("express");

const ProjectsRouter = require("./projects/project-router");
const ResourcesRouter = require("./resources/resource-router");

const server = express();

server.use(express.json());
server.use("/api/projects", ProjectsRouter);
server.use("/api/resources", ResourcesRouter);

module.exports = server;
