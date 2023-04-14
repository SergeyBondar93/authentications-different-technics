const userDAO = require("../dao/user");

async function switchRole(id) {
  try {
    const user = await userDAO.findUserById(id);

    const prevRole = user.roles[0];

    if (prevRole === userDAO.roles.ACCOUNT_MANAGER) {
      user.roles = [userDAO.roles.ADMIN];
    } else {
      user.roles = [userDAO.roles.ACCOUNT_MANAGER];
    }

    return user;
  } catch (err) {
    return Promise.reject("user not found");
  }
}

module.exports = { switchRole };
