const Contact = require("../schemas/contact");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts() {
    const results = await this.model.find({});
    return results;
  }

  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }
  async addContact(body, userId) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }
  async removeContact(id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
    });
    return result;
  }

  async updateContact(id, body) {
    const result = await this.modeln.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return result;
  }
}

module.exports = ContactsRepository;
