const userService = require("../service/user");

function profile(req, res) {
  res.json(req.session);
}

async function switchRole(req, res) {
  const id = req.session.user.id;

  try {
    const user = await userService.switchRole(id);

    const { pwHash, ...sanitizedUser } = user;
    req.session.user = sanitizedUser;
    // req.session.user = user;
    res.sendStatus(204);
  } catch (err) {
    // in prod, do not use console.log or console.error
    // use a proper logging library like winston
    console.error(err);
    res.status(401).json(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(err);
    res.status(401).json(err);
  }
}

module.exports = { profile, switchRole, getAllUsers };
