const express = require("express");
const cors = require("cors");
const app = express();

const routerContacts = require("./api/contactsAPI.js");
const routerUsers = require("./api/usersAPI");

app.use(cors());
app.use(express.json());

app.use("/api/contacts", routerContacts);
app.use("/api/users", routerUsers);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Error on route",
    data: "Not Found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : 500;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
