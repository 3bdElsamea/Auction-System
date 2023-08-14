const express = require("express");
const existenceMW = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllBids,
  getBidByAuction,
  getBidByItem,
  getBidByAuctionAndItem,
} = require("../../controllers/dashboard/bidController");

const router = express.Router();

router.route("/").get(getAllBids);

router
  .route("/auction/:auctionId")
  .get(existenceMW("id", "Auction"), getBidByAuction);

router.route("/item/:itemId").get(existenceMW("id", "Item"), getBidByItem);

router
  .route("/auction/:auctionId/item/:itemId")
  .get(
    existenceMW("id", "Auction"),
    existenceMW("id", "Item"),
    getBidByAuctionAndItem
  );

module.exports = router;
