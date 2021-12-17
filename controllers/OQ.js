const OQ = require("../models/OQ");
const { validationResult } = require("express-validator");

exports.getOQ = (req, res, next) => {
    const { projectId, challengeId } = req.params;
    OQ.fetchOQ(projectId, challengeId)
      .then(({ rows }) => {
        res.status(200).json({
          message: "Opportunity Question fetched successfully.",
          OQ: rows,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

exports.createOQ = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { challengeId } = req.params;
  const { oqId, oqName } = req.body;
  const oq = new OQ(oqId, oqName, challengeId);
  oq
    .save()
    .then(() => {
      res.status(201).json({
        message: "Opportunity Question added successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateOQ = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }
    const { oqId } = req.params;
    const { oqName } = req.body;
    OQ.update(oqId, oqName)
      .then(() => {
        res.status(200).json({
          message: "Opportunity Question updated successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  exports.deleteOQ = (req, res, next) => {
    const { oqId } = req.params;
    OQ.delete(oqId)
      .then(() => {
        res.status(200).json({
            message: "Opportunity Question deleted successfully.",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
