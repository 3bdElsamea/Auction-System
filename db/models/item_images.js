"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item_images.belongsTo(models.Item, {
        foreignKey: "id",
      });
      //   Item hasMany Item_images
      models.Item.hasMany(Item_images, {
        foreignKey: "item_id",
      });
    }
  }

  Item_images.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item_images",
    }
  );
  return Item_images;
};
