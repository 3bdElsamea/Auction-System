const express = require("express");

const authMW = require("../../middlewares/authMW");
const existanceCheckMW = require("../../middlewares/existanceCheckMW");
const {
  register,
  login,
  myProfile,
  updateMyProfile,
  changePassword,
  forgotPassword,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login("User"));
router.post("/forgot-password", forgotPassword);

router.use(authMW("User"));
router.use(existanceCheckMW("User"));

router.route("/me").get(myProfile).patch(updateMyProfile);
router.patch("/me/change-password", changePassword);

module.exports = router;
