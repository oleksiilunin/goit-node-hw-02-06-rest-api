const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  isValidId,
  // validateBody
} = require("../../middlewares");

// const { updateFavoriteSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  // validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
