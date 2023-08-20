"use strict";
const { Model, Op } = require("sequelize");
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
      Item_bid_condition.belongsTo(models.Item, {
        foreignKey: "item_id",
        as: "item",
      });
      Item_bid_condition.belongsTo(models.Auction, {
        foreignKey: "auction_id",
        as: "auction",
      });
    }

    getTotalDuration() {
      return sequelize.models.Item_bid_condition.sum("duration", {
        where: {
          auction_id: this.auction_id,
          order: {
            [Op.lte]: this.order,
          },
        },
        group: ["auction.id"],
      });
    }
  }

  Item_bid_condition.init(
    {
      item_id: DataTypes.INTEGER,
      auction_id: DataTypes.INTEGER,
      order: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      duration: {
        allowNull: false,
        type: DataTypes.INTEGER, // Joi validation [0.25.0.5,1,2,3]
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
      current_high_bid: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      close_price: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: {
          isMoreThanStartAmount(value) {
            if (value < this.start_amount * 3)
              throw new AppError(
                "close_price must be more than 3 times the start_amount",
                400
              );
          },
        },
      },
      status: {
        type: DataTypes.VIRTUAL,

        async get() {
          const now = new Date();
          const auction = await sequelize.models.Auction.findByPk(
            this.auction_id
          );
          const startDate = new Date(auction.start_date);
          const endDate = new Date(
            startDate.getTime() + (await this.getTotalDuration())
          );

          console.log(now < startDate, now >= startDate && now <= endDate);

          if (now < startDate) {
            console.log("upcoming");
            return "upcoming";
          } else if (now >= startDate && now <= endDate) return "ongoing";
          else return "finished";
        },
      },
    },
    {
      sequelize,
      modelName: "Item_bid_condition",
      defaultScope: {
        include: [
          {
            association: "auction",
          },
        ],
      },
      hooks: {
        beforeUpdate: async (item_bid_condition, options) => {
          const auction = await sequelize.models.Auction.findByPk(
            item_bid_condition.auction_id
          );
          if (auction.isActive) {
            throw new AppError(
              "can't update the bidding condition after the auction is activated",
              400
            );
          }
        },
        beforeCreate: async (item_bid_condition, options) => {
          // Set Order
          const lastOrder = await sequelize.models.Item_bid_condition.max(
            "order",
            {
              where: {
                auction_id: item_bid_condition.auction_id,
              },
            }
          );
          item_bid_condition.order = lastOrder ? lastOrder + 1 : 1;
        },
      },
    }
  );
  return Item_bid_condition;
};
