const express = require("express");
const { body } = require("express-validator");

const projectControllers = require("../controllers/projects");

const router = express.Router();

router.get("/projects", projectControllers.getProjects);

router.get("/project/:projectId", projectControllers.getProject);

router.post(
  "/project",
  [body("projectName").trim().isLength({ min: 1 })],
  projectControllers.postProject
);

router.put("/project/:projectId", projectControllers.updateProject);

router.delete("/project/:projectId", projectControllers.deleteProject);

module.exports = router;
