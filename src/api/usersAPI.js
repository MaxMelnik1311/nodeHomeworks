const express = require("express");
const controllerUsers = require("../controllers/usersControllers");
const router = express.Router();
const guard = require("../helpers/guard");

router.post("/auth/register", controllerUsers.reg);
router.post("/auth/login", controllerUsers.login);
router.get("/current", guard, controllerUsers.currentUser);
router.post("/auth/logout", guard, controllerUsers.logout);

module.exports = router;
