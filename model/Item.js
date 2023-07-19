const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/DBConnection.js");

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "items",
  }
);

const Item_images = sequelize.define(
  "Item_images",
  {
    item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "item_images",
  }
);

// Items Relations
Item.hasMany(Item_images, { foreignKey: "item_id" });
Item_images.belongsTo(Item, { foreignKey: "id" });

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = Item;