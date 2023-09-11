const express = require("express");

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const {
  updateFavoriteSchema,
  addContactSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(addContactSchema), ctrl.add);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addContactSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
