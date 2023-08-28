const contacts = require("../models/contacts.js");

const schema = require("../schemas/contacts.js");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await contacts.getContactById(contactId);
  if (!oneContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(oneContact);
};

const add = async (req, res) => {
  const { error } = schema.contactSchemaIsRequired.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw HttpError(400, error.message);
  }

  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { error } = schema.contactSchemaNoRequired.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { contactId } = req.params;
  const body = req.body;

  // if (Object.keys(body).length === 0) {
  //   res.statusCode = 400;
  //   res.json({ message: "missing fields" });
  //   return;
  // }

  const updateContact = await contacts.updateContactById(
    contactId,
    body
    // , {
    // new: true,
    // }
  );

  if (!updateContact) {
    throw HttpError(400, "Not found");
  }

  // res.statusCode = 200;
  // res.json({ updateContact });
  res.json(updateContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await contacts.removeContactById(contactId);

  if (!removeContact) {
    throw HttpError(400, "Not found");
  }

  res.json({ message: "Contact deleted success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
