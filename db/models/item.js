"use strict";
const { Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, {
        foreignKey: "winner_id",
        as: "winner",
      });
    }

    static findBySlug(slug, options = {}) {
      return this.findOne({
        where: { slug: slug },
        ...options,
      });
    }
  }

  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z ]{3,}$/,
        },
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
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
      winner_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      sold_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("available", "sold"),
        defaultValue: "available",
        allowNull: false,
        validate: {
          isIn: [["available", "sold"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
      defaultScope: {
        include: "images",
      },
    }
  );

  SequelizeSlugify.slugifyModel(Item, {
    source: ["name"],
  });
  return Item;
};
