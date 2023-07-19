// const {User } = require("../../db/models/user");
const db = require("../../db/models");
const User = db.User;
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};
