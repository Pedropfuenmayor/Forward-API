const express = require("express");
const { body } = require("express-validator");

const challengeControllers = require("../controllers/challenges");

const router = express.Router();

router.get("/project/:projectId/challenges", challengeControllers.getChallenges);

// router.get("/challenge/:challengeId", projectControllers.getProject);

router.post(
  "/project/:projectId/challenges",
  [body("challengeName").trim().isLength({ min: 1 })],
  challengeControllers.createChallenge
);

// router.put("/project/:projectId", projectControllers.updateProject);

// router.delete("/project/:projectId", projectControllers.deleteProject);

module.exports = router;
