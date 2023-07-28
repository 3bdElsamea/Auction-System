"use strict";
const { Model } = require("sequelize");
const AppError = require("../../utils/appError");
module.exports = (sequelize, DataTypes) => {
  class Item_bid_condition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Item_bid_condition.init(
    {
      item_id: DataTypes.INTEGER,
      auction_id: DataTypes.INTEGER,
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          async isAfterStartDate(value) {
            const auction = await sequelize.models.Auction.findByPk(
              this.auction_id
            );

            if (
              value < auction.start_date ||
              value > auction.end_date - 3600000
            )
              throw new AppError(
                "start_time must be after auction start_date and before auction end_date by at least 1 hour",
                400
              );
          },
        },
      },
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 900000,
          async isLessThan50Minutes(value) {
            const auction = await sequelize.models.Auction.findByPk(
              this.auction_id
            );
            if (this.start_time > auction.end_date - 4500000 && value > 3000000)
              throw new AppError(
                "duration must be less than 50 minutes if the start_time is less than 1.25 hour before the auction end_date",
                400
              );
          },
        },
      },
      start_amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      minimum_bidding_amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          quarterTheStartAmount(value) {
            if (value >= this.start_amount * 0.25)
              throw new AppError(
                "minimum_bidding_amount must be maximum 25% of start_amount",
                400
              );
          },
        },
      },
      close_price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isMoreThanStartAmount(value) {
            if (value < this.start_amount * 2)
              throw new AppError(
                "close_price must be more than 2 times the start_amount",
                400
              );
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item_bid_condition",
    }
  );
  return Item_bid_condition;
};
