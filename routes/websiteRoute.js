const express = require('express');
const auctionRoute=require('./website/auctionRoute');



const router = express.Router();

router.use('/auctions',auctionRoute);


module.exports = router;