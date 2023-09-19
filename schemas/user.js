const Joi = require("joi");

const nameRegexp =
  /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/;

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string().max(24).pattern(nameRegexp).default("User"),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": "Email should be a valid email address",
    "any.required": "Email is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
};
