const express = require("express");
const auctionRoute = require("./dashboard/auctionRoute");
const userRoute = require("./dashboard/userRoute");
const authMW = require("../middlewares/authMW");

const router = express.Router();

// router.use(authMW("Admin"));
router.use(authMW("User"));

router.use("/auctions", auctionRoute);
router.use("/users", userRoute);

module.exports = router;
