const express = require("express");
const { body } = require("express-validator");
const challengesRoutes = require("./challenges");

const projectControllers = require("../controllers/projects");

const router = express.Router();

router.get("/projects", projectControllers.getProjects);

router.post(
  "/projects",
  [body("projectName").trim().isLength({ min: 1 })],
  projectControllers.createProject
);

router.get("/projects/:projectId", projectControllers.getProject);

router.put(
  "/projects/:projectId",
  [body("projectName").trim().isLength({ min: 1 })],
  projectControllers.updateProject
);

router.delete("/projects/:projectId", projectControllers.deleteProject);

router.use("/projects/:projectId/challenges", challengesRoutes);

module.exports = router;
