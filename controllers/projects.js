const Project = require("../models/projects");
const { validationResult } = require("express-validator");

exports.getProjects = (req, res, next) => {
  Project.fetchAll()
    .then(({ rows }) => {
      res.status(200).json({
        message: "Projects fetched successfully.",
        projects: rows,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createProject = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { projectId, projectName, userId } = req.body;
  const project = new Project(projectId, projectName, userId);
  project
    .save()
    .then(() => {
      res.status(201).json({
        message: "Project added successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  Project.findById(projectId)
    .then(({ rows }) => {
      res.status(200).json({
        message: "Project fetched successfully.",
        project: rows,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProject = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { projectId } = req.params;
  const { projectName } = req.body;
  Project.update(projectId, projectName)
    .then(() => {
      res.status(200).json({
        message: "Project updated successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProject = (req, res, next) => {
  const { projectId } = req.params;
  Project.delete(projectId)
    .then(() => {
      res.status(200).json({
          message: "Project deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
