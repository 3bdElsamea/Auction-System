const express = require("express");
const auctionExistenceCheck = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllAuctions,
  createAuction,
  getAuction,
  // deleteAuction,
  updateAuction,
} = require("../../controllers/dashboard/auctionController");

const router = express.Router();

router.route("/").get(getAllAuctions).post(createAuction);

router
  .route("/:id")
  .all(auctionExistenceCheck("id", "Auction"))
  .get(getAuction)
  .patch(updateAuction);
// .delete(deleteAuction);

module.exports = router;
