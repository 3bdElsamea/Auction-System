'use strict';
const {
  Model
} = require('sequelize');
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
  Item_bid_condition.init({
    item_id: DataTypes.INTEGER,
    auction_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    start_amount: DataTypes.INTEGER,
    minimum_bidding_amount: DataTypes.INTEGER,
    close_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item_bid_condition',
  });
  return Item_bid_condition;
};