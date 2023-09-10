const express = require("express");

const ctrl = require("../../controllers/auth");

// const { validateBody } = require("../../middlewares");

// const { registerSchema } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  // validateBody(registerSchema),
  ctrl.register
);

router.post(
  "/login",
  // validateBody(loginSchema),
  ctrl.login
);

module.exports = router;
