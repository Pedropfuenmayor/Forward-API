const express = require("express");
const { body } = require("express-validator");

const router = express.Router({ mergeParams: true });

const OQcontrollers = require("../controllers/OQ");

router.get("/", OQcontrollers.getOQ);

router.post(
  "/",
  [body("oqName").trim().isLength({ min: 1 })],
  OQcontrollers.createOQ
);

router.put(
  "/:oqId",
  [body("oqName").trim().isLength({ min: 1 })],
  OQcontrollers.updateOQ
);

router.delete("/:oqId", OQcontrollers.deleteOQ);

module.exports = router;
