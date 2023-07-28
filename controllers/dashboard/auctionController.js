const catchAsync = require("../../utils/catchAsync");
const db = require("../../db/models");

const Auction = db.Auction;

exports.getAllAuctions = catchAsync(async (req, res, next) => {
  const auctions = await Auction.findAll();
  res.status(200).json({
    status: "success",
    results: auctions.length,
    data: {
      auctions,
    },
  });
});

exports.getAuction = catchAsync(async (req, res, next) => {
  const auction = req.foundRecord;
  res.status(200).json({
    status: "success",
    data: auction,
  });
});

exports.createAuction = catchAsync(async (req, res, next) => {
  const auction = await Auction.create(req.body);
  res.status(201).json({
    status: "success",
    data: auction,
  });
});

exports.updateAuction = catchAsync(async (req, res, next) => {
  const auction = req.foundRecord;
  const updatedAuction = await auction.update(req.body);
  res.status(200).json({
    status: "success",
    data: updatedAuction,
  });
});

// exports.deleteAuction = catchAsync(async (req, res, next) => {
//
// });

exports.getAuctionBids = catchAsync(async (req, res, next) => {});

exports.getAuctionBidders = catchAsync(async (req, res, next) => {});

exports.getAuctionWinners = catchAsync(async (req, res, next) => {});
