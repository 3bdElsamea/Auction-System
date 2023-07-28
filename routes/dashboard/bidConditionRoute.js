const express = require("express");

const conditionExistenceMW = require("../../middlewares/exstenceWithSlugOrIdMW");
const {
  getAllBidConditions,
  getBidCondition,
  createBidCondition,
  updateBidCondition,
} = require("../../controllers/dashboard/bidConditionsController");

const router = express.Router();

router.route("/").get(getAllBidConditions).post(createBidCondition);

router
  .route("/:id")
  .all(conditionExistenceMW("id", "Item_bid_condition"))
  .get(getBidCondition)
  .patch(updateBidCondition);

module.exports = router;
