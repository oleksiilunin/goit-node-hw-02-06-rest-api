const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await write(contacts);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { ...body };

  contacts.push(newContact);

  await write(contacts);

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body, id: contactId };

  await write(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
