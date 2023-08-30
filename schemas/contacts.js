const Joi = require("joi");

const nameRegexp =
  /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/;
const phoneRegexp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

// TODO: email and phone not require ? (in model no require)

const contactSchemaIsRequired = Joi.object({
  name: Joi.string().max(24).pattern(nameRegexp).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean().default(false),
});

const contactSchemaNoRequired = Joi.object({
  name: Joi.string().max(24).pattern(nameRegexp),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchemaIsRequired,
  contactSchemaNoRequired,
  updateFavoriteSchema,
};
