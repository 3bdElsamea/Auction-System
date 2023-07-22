const db = require("../db/models");
const Admin = db.Admin;
const User = db.User;
module.exports = (role) => {
  return role === "Admin" ? Admin : User;
};
