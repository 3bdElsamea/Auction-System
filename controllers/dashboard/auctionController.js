const catchAsync = require("../../utils/catchAsync");
const db = require("../../db/models");
const AppError = require("../../utils/appError");
const { success } = require("../../utils/response");
const Auction = db.Auction;

exports.getAllAuctions = catchAsync(async (req, res, next) => {
  const auctions = await Auction.findAll();
  success(res, 200, { data: auctions });
});

exports.getAuction = catchAsync(async (req, res, next) => {
  const auction = req.foundRecord;
  success(res, 200, { data: auction });
});

exports.createAuction = catchAsync(async (req, res, next) => {
  const auction = await Auction.create(req.body);
  success(res, 201, {
    message:
      "Auction created successfully, please add items to the auction and activate it",
    data: auction,
  });
});

exports.updateAuction = catchAsync(async (req, res, next) => {
  const auction = req.foundRecord;
  const updatedAuction = await auction.update(req.body);
  success(res, 200, { data: updatedAuction });
});

exports.activateAuction = catchAsync(async (req, res, next) => {
  const auction = req.foundRecord;
  const startDate = new Date(auction.start_Date);
  const now = new Date();
  if (startDate - now < 24 * 60 * 60 * 1000) {
    return next(
      new AppError(
        "The auction start date should be at least a day from now , please update the auction start date and try again",
        400
      )
    );
  }
  await auction.update({
    isActive: true,
  });

  success(res, 200, { message: "Auction activated successfully" });
});

// exports.getAuctionBids = catchAsync(async (req, res, next) => {});
//
// exports.getAuctionBidders = catchAsync(async (req, res, next) => {});
//
// exports.getAuctionWinners = catchAsync(async (req, res, next) => {});
