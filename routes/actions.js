const express = require("express");
const { body } = require("express-validator");
const validator = require("validator");

const router = express.Router({ mergeParams: true });

const actionsControllers = require("../controllers/actions");

router.get("/:userId", actionsControllers.getActions);

router.post(
  "/",
  [
    body("what").trim().not().isEmpty(),
    body("succesCriteria").trim().not().isEmpty(),
  ],
  actionsControllers.createAction
);

router.get("/", actionsControllers.getAction);

router.put(
  "/:actionId",
  [
    body("what").trim().not().isEmpty(),
    body("succesCriteria").trim().not().isEmpty(),
  ],
  actionsControllers.updateAction
);

router.delete("/:actionId", actionsControllers.deleteAction);

module.exports = router;
