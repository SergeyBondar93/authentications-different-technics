const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");
const authController = require("../controller/auth");
const profileController = require("../controller/profile");
const logoutController = require("../controller/logout");
const path = require("path");

router.get("/", (_req, res) => {
  const index = path.resolve(
    __dirname,
    "..",
    "..",
    "static",
    "cookie-session.html"
  );
  console.log(index);
  res.sendFile(index);
});

router.post("/api/auth/login", authController.login);
router.get("/api/auth/logout", logoutController.logout);

// all routes that come after this middleware are protected
// and can only be accessed if the user is logged in
router.use(authenticate);

router.get("/api/users/me/switch-role", profileController.switchRole);
router.get("/api/users/me/profile", profileController.profile);

router.use(adminOnly);
router.get("/api/users/all", profileController.getAllUsers);

module.exports = router;
