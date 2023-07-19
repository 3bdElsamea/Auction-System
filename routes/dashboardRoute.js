const express = require("express");
const auctionRoute = require("./dashboard/auctionRoute");
const userRoute = require("./dashboard/userRoute");

const router = express.Router();

router.use("/auctions", auctionRoute);
router.use("/users", userRoute);

module.exports = router;