const express = require("express");
const { body } = require("express-validator");

const router = express.Router({ mergeParams: true });

const actionsControllers = require("../controllers/actions");

router.get("/:userId", actionsControllers.getActions);

router.post("/", actionsControllers.createAction);

router.get("/", actionsControllers.getAction);

router.put("/:actionId", actionsControllers.updateAction);

router.delete("/:actionId", actionsControllers.deleteAction);

module.exports = router;
