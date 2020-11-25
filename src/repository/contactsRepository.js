const { v4: uuid } = require("uuid");
const db = require("../db");

class ContactsRepository {
  listContacts() {
    return db.get("contacts").value();
  }
  getById(id) {
    return db.get("contacts").find({ id }).value();
  }
  addContact(body) {
    const id = uuid();
    const newContact = {
      id,
      ...body,
    };
    db.get("contacts").push(newContact).write();
    return newContact;
  }
  removeContact(id) {
    const [contactToDel] = db.get("contacts").remove({ id }).write();
    return contactToDel;
  }

  updateContact(id, body) {
    const contact = db.get("contacts").find({ id }).assign(body).value();
    db.write();
    return contact.id ? contact : null;
  }
}

module.exports = ContactsRepository;
