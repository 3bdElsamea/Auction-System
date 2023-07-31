const { CronJob } = require("cron");
const catchAsync = require("../../utils/catchAsync");
const db = require("../../db/models");
const Auction = db.Auction;
const BidCondition = db.Item_bid_condition;

exports.auctionStart = (auction) => {
  const startDate = new Date(auction.start_Date);
  const job = new CronJob(startDate, async function () {
    console.log("Auction Started");
    await auction.update({
      status: "ongoing",
    });
    job.stop();
  });
};

exports.auctionEnd = (auction) => {
  const endDate = new Date(auction.end_Date);
  const job = new CronJob(
    endDate,
    async function () {
      const checkAuction = await Auction.findByPk(auction.id);
      if (new Date(checkAuction.end_Date).getTime() === endDate.getTime()) {
        console.log("Auction Ended");
        await auction.update({
          status: "completed",
        });
        job.stop();
      } else {
        console.log("Auction end date changed. Restarting job...");
        job.stop();
        await exports.auctionEnd(checkAuction); // Restart the job
      }
    },
    null,
    true
  );
};
