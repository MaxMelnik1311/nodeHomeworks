const express = require("express");
const router = express.Router();
const controllerContacts = require("../controllers/contactsControllers.js");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../validation/contacts.js");

const guard = require("../helpers/guard");

router
  .get("/", guard, controllerContacts.listContacts)
  .get("/:id", guard, controllerContacts.getById)
  .post("/", guard, validateCreateContact, controllerContacts.addContact)
  .delete("/:id", guard, controllerContacts.removeContact)
  .patch(
    "/:id",
    guard,
    validateUpdateContact,
    controllerContacts.updateContact
  );

module.exports = router;
