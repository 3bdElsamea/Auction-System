const express = require("express");

const existenceCheckMW = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  restoreUser,
} = require("../../controllers/dashboard/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:slug")
  .all(existenceCheckMW("slug", "User"))
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.patch("/:slug/restore", restoreUser);
module.exports = router;
