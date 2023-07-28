const express = require("express");
const authMW = require("../middlewares/authMW");
const checkSuperMW = require("../middlewares/checkSuperMW");
const authRoute = require("./dashboard/authRoute");
const auctionRoute = require("./dashboard/auctionRoute");
const userRoute = require("./dashboard/userRoute");
const adminRoute = require("./dashboard/adminRoute");
const itemRoute = require("./dashboard/itemRoute");
const bidConditionRoute = require("./dashboard/bidConditionRoute");
const bidRoute = require("./dashboard/bidRoute");
const itemImageRoute = require("./dashboard/itemImagesRoute");

const router = express.Router();

router.use("/auth", authRoute);

router.use(authMW("Admin"));

router.use("/admins", checkSuperMW, adminRoute);
router.use("/users", userRoute);
router.use("/auctions", auctionRoute);
router.use("/items", itemRoute, itemImageRoute);
router.use("/bid-conditions", bidConditionRoute);
router.use("/bids", bidRoute);

module.exports = router;
