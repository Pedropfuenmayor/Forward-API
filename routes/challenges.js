const express = require("express");
const { body } = require("express-validator");

const challengeControllers = require("../controllers/challenges");

const router = express.Router({ mergeParams: true });

const oqRoutes = require("./OQ");

const ideasRoutes = require("./ideas");

router.get("/", challengeControllers.getChallenges);

router.post(
  "/",
  [body("challengeName").trim().not().isEmpty()],
  challengeControllers.createChallenge
);

router.get("/selected", challengeControllers.chosenChallenges);

router.get("/:challengeId", challengeControllers.getChallenge);

router.put(
  "/:challengeId",
  [body("challengeName").trim().not().isEmpty()],
  challengeControllers.updateChallenge
);

router.put("/", challengeControllers.selectChallenges);

router.delete("/:challengeId", challengeControllers.deleteChallenge);

router.use("/:challengeId/oq", oqRoutes);

router.use("/:challengeId/ideas", ideasRoutes);

module.exports = router;
