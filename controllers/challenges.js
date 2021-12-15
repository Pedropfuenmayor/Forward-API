const Challenge = require("../models/projects");
const { validationResult } = require("express-validator");

exports.getChallenges = (req, res, next) => {
  const { projectId } = req.params;
  Challenge.fetchAll(projectId)
    .then(({ rows }) => {
      res.status(200).json({
        message: "Challenges fetched successfully.",
        challenges: rows,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createChallenge = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { projectId } = req.params;
  const { challengeId, challengeName, challengeType } = req.body;
  const challenge = new Challenge(
    challengeId,
    challengeName,
    projectId,
    challengeType
  );
  challenge
    .save()
    .then(() => {
      res.status(201).json({
        message: "Challenge added successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
