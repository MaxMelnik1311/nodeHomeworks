const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, list) => {
    if (err) throw err;
    console.log(JSON.parse(list));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, list) => {
    if (err) throw err;
    const contact = JSON.parse(list).find(
      (contact) => contact.id === contactId
    );
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, contacts) => {
    if (err) throw err;

    const updatedList = JSON.parse(contacts).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedList),
      { encoding: "utf8" },
      (err) => {
        if (err) throw err;
      }
    );
    listContacts();
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, list) => {
    if (err) throw err;

    const updatedList = [...JSON.parse(list), { name, email, phone }];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedList),
      { encoding: "utf8" },
      (err) => {
        if (err) throw err;
      }
    );
    listContacts();
  });
}
exports.listContacts = listContacts;
exports.getContactById = getContactById;
exports.removeContact = removeContact;
exports.addContact = addContact;
