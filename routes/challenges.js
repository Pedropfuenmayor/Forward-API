const express = require("express");
const { body } = require("express-validator");

const challengeControllers = require("../controllers/challenges");

const router = express.Router({ mergeParams: true });

router.get("/", challengeControllers.getChallenges);

router.post(
  "/",
  [body("challengeName").trim().isLength({ min: 1 })],
  challengeControllers.createChallenge
);

router.get("/:challengeId", challengeControllers.getChallenge);

router.put(
  "/:challengeId",
  [body("challengeName").trim().isLength({ min: 1 })],
  challengeControllers.updateChallenge
);

router.put("/", challengeControllers.selectChallenges);

router.delete("/:challengeId", challengeControllers.deleteChallenge);

module.exports = router;
