const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/usersControllers");
const upload = require("../helpers/multer");
const guard = require("../helpers/guard");

router.post("/auth/register", controllerUsers.reg);
router.get("/verify/:token", controllerUsers.verify);
router.post("/auth/login", controllerUsers.login);
router.get("/current", guard, controllerUsers.currentUser);
router.post("/auth/logout", guard, controllerUsers.logout);
router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  controllerUsers.avatars
);

module.exports = router;
