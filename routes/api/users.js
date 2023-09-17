const express = require("express");

const ctrl = require("../../controllers/users");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
