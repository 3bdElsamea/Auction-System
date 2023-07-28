const express = require("express");

const itemExistenceCheck = require("../../middlewares/exstenceWithSlugOrIdMW");

const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
} = require("../../controllers/dashboard/itemController");

const router = express.Router();

router.route("/").get(getAllItems).post(createItem);

router
  .route("/:slug")
  .all(itemExistenceCheck("slug", "Item"))
  .get(getItem)
  .patch(updateItem);

module.exports = router;
