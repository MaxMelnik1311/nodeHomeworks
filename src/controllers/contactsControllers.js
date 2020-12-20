const ContactsService = require("../services/contactsService.js");
const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const list = await contactsService.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: { list },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return next({
        status: 404,
        message: "Not found",
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.addContact(req.body, userId);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params);
    if (contact) {
      return res.status(200).json({
        status: "contact deleted",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: 404,
        message: "Not found",
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsService.updateContact(req.params, req.body);
    if (contact) {
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: 404,
        message: "Not found person",
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
