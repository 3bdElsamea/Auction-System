const express = require("express");
const authMW = require("../middlewares/authMW");
const auctionRoute = require("./website/auctionRoute");
const authRoute = require("./website/authRoute");

const router = express.Router();
router.use("/auth", authRoute);
router.use("/auctions", auctionRoute);

module.exports = router;
