const db = require("../../db/models");
const catchAsync = require("../../utils/catchAsync");

const Bid = db.Bid;

exports.getAllBids = catchAsync(async (req, res) => {
  const bids = await Bid.findAll();
  res.status(200).json({
    status: "success",
    results: bids.length,
    data: { bids },
  });
});

exports.getBid = catchAsync(async (req, res) => {
  const bid = req.foundRecord;
  res.status(200).json({
    status: "success",
    data: { bid },
  });
});

// Only for user in the website
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

exports.getBidByAuction = catchAsync(async (req, res) => {
  const bids = await Bid.findAll({
    where: { auction_id: req.params.auctionId },
  });
  res.status(200).json({
    status: "success",
    results: bids.length,
    data: { bids },
  });
});

exports.getBidByItem = catchAsync(async (req, res) => {
  const bids = await Bid.findAll({
    where: { item_id: req.params.itemId },
  });
  res.status(200).json({
    status: "success",
    results: bids.length,
    data: { bids },
  });
});

exports.getBidByUser = catchAsync(async (req, res) => {
  const bids = await Bid.findAll({
    where: { user_id: req.params.userId },
  });
  res.status(200).json({
    status: "success",
    results: bids.length,
    data: { bids },
  });
});

exports.getBidByAuctionAndItem = catchAsync(async (req, res) => {
  const bids = await Bid.findAll({
    where: {
      auction_id: req.params.auctionId,
      item_id: req.params.itemId,
    },
  });
  res.status(200).json({
    status: "success",
    results: bids.length,
    data: { bids },
  });
});
