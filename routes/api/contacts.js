const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts.js");
const schema = require("../../schemas/contacts.js");

router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const oneContact = await contacts.getContactById(id);
  if (!oneContact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    next(error);
  }
  res.statusCode = 200;
  res.json(oneContact);
});

router.post("/", async (req, res, next) => {
  const { error } = schema.contactSchemaIsRequired.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .send(
        `"Error": ${error.details.map((error) => error.message).join(", ")}`
      );
  }

  const { name, email, phone } = req.body;

  const newContact = await contacts.addContact({ name, email, phone });

  res.statusCode = 201;
  res.json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;

  const removeContact = await contacts.removeContactById(id);
  if (!removeContact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    next(error);
  }

  res.statusCode = 200;
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.contactSchemaNoRequired.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .send(
        `"Error": ${error.details.map((error) => error.message).join(", ")}`
      );
  }

  const id = req.params.contactId;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.statusCode = 400;
    res.json({ message: "missing fields" });
    return;
  }

  const updateContact = await contacts.updateContactById(id, body, {
    new: true,
  });

  if (!updateContact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    next(error);
  }

  res.statusCode = 200;
  res.json({ updateContact });
});

module.exports = router;
