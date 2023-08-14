const db = require("../../db/models");
const catchAsync = require("../../utils/catchAsync");

const Bid = db.Bid;

exports.createBid = catchAsync(async (req, res) => {
  const bid = await Bid.create({
    user_id: req.user.id,
    amount: req.body.amount,
    item_id: req.body.item_id,
    auction_id: req.body.auction_id,
  });
  res.status(201).json({
    status: "success",
    data: { bid },
  });
});