const express = require("express");

const authMW = require("../../middlewares/authMW");
const existenceCheckMW = require("../../middlewares/authExistenceCheckMW");
const {
  register,
  login,
  myProfile,
  updateMyProfile,
  deleteMyProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login("User"));
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(authMW("User"));
router.use(existenceCheckMW("User"));

router
  .route("/me")
  .get(myProfile)
  .patch(updateMyProfile)
  .delete(deleteMyProfile);
router.patch("/me/change-password", changePassword);

module.exports = router;
