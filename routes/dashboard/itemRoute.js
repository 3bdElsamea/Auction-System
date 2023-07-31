const express = require("express");

const itemExistenceCheck = require("../../middlewares/exstenceWithSlugOrIdMW");
const blacklist = require("../../middlewares/blacklistMW");
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
} = require("../../controllers/dashboard/itemController");

const router = express.Router();
const blacklistArray = ["winner_id", "sold_price", "status"];

router.route("/").get(getAllItems).post(blacklist(blacklistArray), createItem);

router
  .route("/:slug")
  .all(itemExistenceCheck("slug", "Item"))
  .get(getItem)
  .patch(blacklist(blacklistArray), updateItem);

module.exports = router;
