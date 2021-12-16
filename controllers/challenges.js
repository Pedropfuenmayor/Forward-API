const Challenge = require("../models/challenges");
const { validationResult } = require("express-validator");
const extractedChallengesIds = require('../util/extractedChallengesIds').extractedChallengesIds

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

exports.getChallenge = (req, res, next) => {
    const { projectId, challengeId } = req.params;
    Challenge.findById(projectId, challengeId)
      .then(({ rows }) => {
        res.status(200).json({
          message: "Challenge fetched successfully.",
          challenge: rows,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.updateChallenge = (req, res, next) => {
    const { challengeId } = req.params;
    const { challengeName } = req.body;
    Challenge.update(challengeId, challengeName)
      .then(() => {
        res.status(200).json({
          message: "Challenge updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.selectChallenges = (req, res, next) => {
    const { challengesIds } = req.body;
    const selectedChallengesIds = extractedChallengesIds(challengesIds)
    Challenge.selectChallenges(selectedChallengesIds)
      .then(() => {
        res.status(200).json({
          message: "Challenges updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.deleteChallenge = (req, res, next) => {
    const { challengeId } = req.params;
    Challenge.delete(challengeId)
      .then(() => {
        res.status(200).json({
            message: "Challenge deleted successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };