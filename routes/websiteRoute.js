const express = require("express");
const authMW = require("../middlewares/authMW");
const auctionRoute = require("./website/auctionRoute");
const authRoute = require("./website/authRoute");
const bidRoute = require("./website/bidRoute");

const router = express.Router();
router.use("/auth", authRoute);
router.use("/auctions", auctionRoute);

router.use(authMW("User"));
router.use("/bids", bidRoute);

module.exports = router;
