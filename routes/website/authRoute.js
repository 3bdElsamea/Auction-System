const express = require("express");

const authMW = require("../../middlewares/authMW");
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
router.get("/me", authMW("User"), myProfile("User"));
router.patch("/me/update", authMW("User"), updateMyProfile("User"));
router.patch("/me/change-password", authMW("User"), changePassword("User"));
router.post("/forgot-password", forgotPassword);

module.exports = router;
