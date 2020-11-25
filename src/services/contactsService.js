const ContactsRepository = require("../repository/contactsRepository.js");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  listContacts() {
    const contactList = this.repositories.contacts.listContacts();
    return contactList;
  }

  getById({ id }) {
    const contactById = this.repositories.contacts.getById(id);
    return contactById;
  }

  addContact(body) {
    const newContact = this.repositories.contacts.addContact(body);
    return newContact;
  }

  removeContact({ id }) {
    const contact = this.repositories.contacts.removeContact(id);
    return contact;
  }

  updateContact({ id }, body) {
    const contact = this.repositories.contacts.updateContact(id, body);
    return contact;
  }
}

module.exports = ContactsService;
