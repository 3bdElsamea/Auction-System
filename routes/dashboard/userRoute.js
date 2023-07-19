// import get all users controller from controllers\dashboard\userController.js
// import create user controller from controllers\dashboard\userController.js

const express = require("express");
const {
  getAllUsers,
  createUser,
} = require("../../controllers/dashboard/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

module.exports = router;
