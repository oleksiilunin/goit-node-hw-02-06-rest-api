const Joi = require("joi");

const contactSchemaIsRequired = Joi.object({
  name: Joi.string()
    .max(24)
    .pattern(
      /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/
    )
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/
    )
    .required(),
});

const contactSchemaNoRequired = Joi.object({
  name: Joi.string()
    .max(24)
    .pattern(
      /^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/
    ),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/
  ),
});

module.exports = {
  contactSchemaIsRequired,
  contactSchemaNoRequired,
};
