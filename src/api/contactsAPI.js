const express = require("express");
const router = express.Router();
const controllerContacts = require("../controllers/contactsControllers.js");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../validation/contacts.js");

router
  .get("/", controllerContacts.listContacts)
  .get("/:id", controllerContacts.getById)
  .post("/", validateCreateContact, controllerContacts.addContact)
  .delete("/:id", controllerContacts.removeContact)
  .patch("/:id", validateUpdateContact, controllerContacts.updateContact);

module.exports = router;
