async function logout(req, res) {
  req.session.user = null;
  res.sendStatus(200);
}

module.exports = {
  logout,
};
