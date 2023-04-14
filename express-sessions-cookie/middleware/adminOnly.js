const { roles } = require("../dao/user");

function adminOnly(req, res, next) {
  if (
    !req.session ||
    !req.session.user ||
    !req.session.user.roles.includes(roles.ADMIN)
  ) {
    const err = new Error("You shall not pass");
    err.statusCode = 401;
    next(err);
  }
  next();
}

module.exports = adminOnly;
