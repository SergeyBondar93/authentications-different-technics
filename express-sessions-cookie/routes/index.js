const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
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

router.post("/api/login", authController.login);

// all routes that come after this middleware are protected
// and can only be accessed if the user is logged in
router.use(authenticate);

router.get("/api/profile", profileController.profile);
router.get("/api/logout", logoutController.logout);
router.get("/api/switch-role", profileController.switchRole);

module.exports = router;
