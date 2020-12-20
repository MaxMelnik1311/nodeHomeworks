const ContactsRepository = require("../repository/contactsRepository.js");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async listContacts() {
    const contactList = await this.repositories.contacts.listContacts();
    return contactList;
  }

  async getById({ id }) {
    const contactById = await this.repositories.contacts.getById(id);
    return contactById;
  }

  async addContact(body) {
    const newContact = await this.repositories.contacts.addContact(body);
    return newContact;
  }

  async removeContact({ id }) {
    const contact = await this.repositories.contacts.removeContact(id);
    return contact;
  }

  async updateContact({ id }, body) {
    const contact = await this.repositories.contacts.updateContact(id, body);
    return contact;
  }
}

module.exports = ContactsService;
