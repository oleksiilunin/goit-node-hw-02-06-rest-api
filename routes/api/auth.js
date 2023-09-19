const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
} = require("../../schemas/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.post("/verify", validateBody(verifyEmailSchema), ctrl.resendVerifyEmail);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
