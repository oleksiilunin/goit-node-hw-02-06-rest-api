const Joi = require("joi");

const nameRegexp =
  /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/;
const phoneRegexp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

const addContactSchema = Joi.object({
  name: Joi.string().max(24).pattern(nameRegexp).required().messages({
    "any.required": "Field 'name' is missing",
    "string.pattern.base":
      "Name may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Field 'email' is missing",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": "Field 'phone' is missing",
    "string.pattern.base":
      "Phone number must be a valid phone number, digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

module.exports = {
  addContactSchema,
  updateFavoriteSchema,
};
