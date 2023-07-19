"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to user
      Transaction.belongsTo(models.User, {
        foreignKey: "id",
      });
      models.User.hasMany(Transaction, {
        foreignKey: "user_id",
      });
    }
  }

  Transaction.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("success", "failed", "pending"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
