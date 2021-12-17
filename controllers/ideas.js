const Idea = require("../models/ideas");
const { validationResult } = require("express-validator");
const extractedIdeasIds = require('../util/extractedChallengesIds').extractedChallengesIds

exports.createIdea = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { challengeId } = req.params;
  const { ideaId, ideaName } = req.body;
  const idea = new Idea(ideaId, ideaName, challengeId);
  idea
    .save()
    .then(() => {
      res.status(201).json({
        message: "Idea added successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getIdeas = (req, res, next) => {
  const { projectId, challengeId } = req.params;
  Idea.fetchAll(projectId, challengeId)
    .then(({ rows }) => {
      res.status(200).json({
        message: "Ideas fetched successfully.",
        ideas: rows,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getIdea = (req, res, next) => {
  const { projectId, challengeId, ideaId } = req.params;
  Idea.findById(projectId, challengeId, ideaId)
    .then(({ rows }) => {
      res.status(200).json({
        message: "Idea fetched successfully.",
        idea: rows,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateIdea = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { ideaId } = req.params;
  const { ideaName } = req.body;
  Idea.update(ideaId, ideaName)
    .then(() => {
      res.status(200).json({
        message: "Idea updated successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.selectIdeas = (req, res, next) => {
    const { ideasIds } = req.body;
    const selectedIdeasIds = extractedIdeasIds(ideasIds)
    Idea.selectideas(selectedIdeasIds)
      .then(() => {
        res.status(200).json({
          message: "Ideas updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.chosenIdeas = (req, res, next) => {
    const { projectId, challengeId} = req.params;
    Idea.chosenIdeas(projectId, challengeId)
      .then(({ rows }) => {
        res.status(200).json({
          message: "Chosen ideas fetched successfully.",
          ideas: rows,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.updateImpact = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const { ideaId } = req.params;
    const { ideaImpact } = req.body;
    Idea.updateImpact(ideaId, ideaImpact)
      .then(() => {
        res.status(200).json({
          message: "Idea impact updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.updateEffort = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const { ideaId } = req.params;
    const { ideaEffort } = req.body;
    Idea.updateEffort(ideaId, ideaEffort )
      .then(() => {
        res.status(200).json({
          message: "Idea effort updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.deleteIdea = (req, res, next) => {
    const { ideaId } = req.params;
    Idea.delete(ideaId)
      .then(() => {
        res.status(200).json({
            message: "Idea deleted successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
