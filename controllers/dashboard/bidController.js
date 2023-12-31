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
