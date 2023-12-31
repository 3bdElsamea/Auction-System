"use strict";
const { Model, Op } = require("sequelize");
const AppError = require("../../utils/appError");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      models.User.hasMany(this, {
        foreignKey: "user_id",
      });

      this.belongsTo(models.Item, {
        foreignKey: "item_id",
      });

      models.Item.hasMany(this, {
        foreignKey: "item_id",
      });

      this.belongsTo(models.Auction, {
        foreignKey: "auction_id",
      });

      models.Auction.hasMany(this, {
        foreignKey: "auction_id",
      });
    }
  }

  Bid.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          async validateAmount(value) {
            const itemBidCondition =
              await sequelize.models.Item_bid_condition.findOne({
                where: {
                  [Op.and]: [
                    { item_id: this.item_id },
                    { auction_id: this.auction_id },
                  ],
                },
              });
            if (value < itemBidCondition.minimum_bidding_amount) {
              throw new AppError(
                `Bid amount must be greater than or equal to ${itemBidCondition.minimum_bidding_amount}`
              );
            }
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      auction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Bid",
      hooks: {
        beforeCreate: async (bid, options) => {
          const auction = await sequelize.models.Auction.findByPk(
            bid.auction_id
          );
          if (auction.status !== "ongoing")
            throw new AppError(
              "can't create a bid unless the auction status is ongoing",
              400
            );
          const itemBidCondition =
            await sequelize.models.Item_bid_condition.findOne({
              where: {
                [Op.and]: [
                  { item_id: bid.item_id },
                  { auction_id: bid.auction_id },
                ],
              },
            });
          const startDate = new Date(itemBidCondition.start_time);
          if (startDate > new Date())
            throw new AppError(
              "can't create a bid unless the item start time is passed",
              400
            );
        },

        afterCreate: async (bid, options) => {
          const itemBidCondition =
            await sequelize.models.Item_bid_condition.findOne({
              where: {
                [Op.and]: [
                  { item_id: bid.item_id },
                  { auction_id: bid.auction_id },
                ],
              },
            });
          const previousHighBid = itemBidCondition.current_high_bid;
          itemBidCondition.current_high_bid = previousHighBid + bid.amount;
          await itemBidCondition.save();
          //   after creat a bid if the auction end time is about or less than 45 seconds then add 45 seconds to the auction end time
        },
      },
    }
  );
  return Bid;
};
