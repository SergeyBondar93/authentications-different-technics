async function logout(req, res) {
  req.session.destroy();
  res.sendStatus(200);
}

module.exports = {
  logout,
};
