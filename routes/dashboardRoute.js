const express = require('express');
const auctionRoute=require('./dashboard/auctionRoute');



const router = express.Router();

router.use('/auctions',auctionRoute);


module.exports = router;