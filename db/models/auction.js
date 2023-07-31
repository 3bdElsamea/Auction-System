"use strict";
const { Model } = require("sequelize");
const AppError = require("../../utils/appError");

module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Auction.init(
    {
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      entry_fees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: DataTypes.VIRTUAL,
        get() {
          const now = new Date();
          const startDate = new Date(this.start_date);
          const endDate = new Date(this.end_date);
          if (!this.isActive) return "not active";
          else if (now < startDate) return "upcoming";
          else if (now >= startDate && now <= endDate) return "ongoing";
          else return "finished";
        },
      },
    },

    {
      sequelize,
      modelName: "Auction",
      hooks: {
        //   before update the isActive field to true, check if the auction has any items

        beforeUpdate: async (auction) => {
          if (auction.isActive) {
            const auctionItems =
              await sequelize.models.Item_bid_condition.findAll({
                where: {
                  auction_id: auction.id,
                },
              });
            if (auctionItems.length === 0) {
              throw new AppError("Cannot start auction without any items", 400);
            }
          }
        },
      },
    }
  );

  return Auction;
};
