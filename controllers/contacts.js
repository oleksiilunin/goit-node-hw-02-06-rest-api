const Contact = require("../models/contact.js");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const allContacts = await Contact.find({ owner }, "-createAt", {
    skip,
    limit,
  });
  //   .populate(
  //   "owner",
  //   "name email"
  // )
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(oneContact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const updateContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(400, "Not found");
  }
  res.json(updateContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const updateContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(400, "Not found");
  }
  res.json(updateContact);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await Contact.findByIdAndRemove(contactId);

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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
