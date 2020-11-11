const exportedFunctions = require("./contacts.js");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      exportedFunctions.listContacts();
      break;

    case "get":
      exportedFunctions.getContactById(id);
      break;

    case "add":
      exportedFunctions.addContact(name, email, phone);
      break;

    case "remove":
      exportedFunctions.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
