"use strict";
const { Model } = require("sequelize");
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
      // reference_number: DataTypes.INTEGER,
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
          isAfter: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
        },
      },
      entry_fees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.VIRTUAL,
        get() {
          const currentDate = new Date();
          if (currentDate > this.end_date) {
            return "Completed";
          } else if (currentDate > this.start_date) {
            return "Ongoing";
          } else {
            return "Upcoming";
          }
        },
      },
    },
    {
      sequelize,
      modelName: "Auction",
    }
  );
  return Auction;
};
