const express = require("express");
const auctionExistenceCheck = require("../../middlewares/exstenceWithSlugOrIdMW");
const blackList = require("../../middlewares/blackListMW");
const {
  getAllAuctions,
  createAuction,
  getAuction,
  updateAuction,
  activateAuction,
} = require("../../controllers/dashboard/auctionController");

const router = express.Router();

const blackListArray = ["isActive"];

router
  .route("/")
  .get(getAllAuctions)
  .post(blackList(blackListArray), createAuction);

router
  .route("/:id")
  .all(auctionExistenceCheck("id", "Auction"))
  .get(getAuction)
  .patch(blackList(blackListArray), updateAuction);

router.patch(
  "/:id/activate",
  auctionExistenceCheck("id", "Auction"),
  activateAuction
);
module.exports = router;
