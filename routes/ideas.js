const express = require("express");
const { body } = require("express-validator");

const router = express.Router({ mergeParams: true });

const ideasControllers = require("../controllers/ideas");

const actionsRoutes = require("./actions");

router.get("/selected", ideasControllers.chosenIdeas);

router.get("/", ideasControllers.getIdeas);

router.post(
  "/",
  [body("ideaName").trim().not().isEmpty()],
  ideasControllers.createIdea
);

router.get("/:ideaId", ideasControllers.getIdea);

router.put(
  "/:ideaId",
  [body("ideaName").trim().not().isEmpty()],
  ideasControllers.updateIdea
);

router.put("/", ideasControllers.selectIdeas);

router.put("/:ideaId/impact", ideasControllers.updateImpact);

router.put("/:ideaId/effort", ideasControllers.updateEffort);

router.delete("/:ideaId", ideasControllers.deleteIdea);

router.use("/:ideaId/actions", actionsRoutes);

module.exports = router;
