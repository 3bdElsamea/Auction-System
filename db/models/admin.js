"use strict";
const { Model } = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");
const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static findByEmail(email) {
      return this.findOne({ where: { email: email } });
    }

    static findBySlug(slug) {
      return this.findOne({ where: { slug: slug } });
    }
  }

  Admin.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  useBcrypt(Admin);

  SequelizeSlugify.slugifyModel(Admin, {
    source: ["name"],
  });

  return Admin;
};
