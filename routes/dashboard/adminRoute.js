const express = require("express");
const adminExistenceCheck = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  restoreAdmin,
} = require("../../controllers/dashboard/adminController");

const router = express.Router();

router.route("/").get(getAllAdmins).post(createAdmin);

router
  .route("/:slug")
  .all(adminExistenceCheck("slug", "Admin"))
  .get(getAdmin)
  .patch(updateAdmin)
  .delete(deleteAdmin);

router.patch("/:slug/restore", restoreAdmin);

module.exports = router;
