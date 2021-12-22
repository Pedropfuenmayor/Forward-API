const Action = require("../models/actions");
const { validationResult } = require("express-validator");


exports.createAction = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const { ideaId } = req.params;
    const { actionId, what, dueDate, testUntil, succesCriteria} = req.body;
    const action = new Action(actionId, what, dueDate, testUntil, succesCriteria, ideaId);
    action
      .save()
      .then(() => {
        res.status(201).json({
          message: "Action added successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.getActions = (req, res, next) => {
    const { userId } = req.params;
    Action.fetchAll(userId )
      .then(({ rows }) => {
        res.status(200).json({
          message: "Actions fetched successfully.",
          actions: rows,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.getAction = (req, res, next) => {
    const {projectId, challengeId, ideaId } = req.params;
    Action.findById(projectId, challengeId, ideaId )
      .then(({ rows }) => {
        res.status(200).json({
          message: "Action fetched successfully.",
          action: rows,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.updateAction = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const { actionId } = req.params;
    const { what, dueDate, testUntil, succesCriteria} = req.body;
    Action.update(what, dueDate, testUntil, succesCriteria, actionId)
      .then(() => {
        res.status(200).json({
          message: "Action updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.deleteAction = (req, res, next) => {
    const { actionId } = req.params;
    Action.delete(actionId)
      .then(() => {
        res.status(200).json({
            message: "Action deleted successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

