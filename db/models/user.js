"use strict";
const { Model } = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");
const SequelizeSlugify = require("sequelize-slugify");
const SequelizeTokenify = require("sequelize-tokenify");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static findByEmail(email) {
      return this.findOne({
        where: {
          email,
        },
      });
    }

    static findBySlug(slug) {
      return this.findOne({
        where: {
          slug,
        },
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [/^[a-zA-Z ]{3,}$/],
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: null,
        //     {
        //   is: {
        //     // args: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/],
        //   },
        // },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [/^01[0125][0-9]{8}$/],
          },
        },
      },
      image: DataTypes.STRING,
      balance: DataTypes.INTEGER,
      pending_balance: DataTypes.INTEGER,
      false_bids: DataTypes.INTEGER,
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  useBcrypt(User);
  SequelizeSlugify.slugifyModel(User, {
    source: ["name"],
  });
  SequelizeTokenify.tokenify(User, {
    field: "reset_token",
    length: 12,
  });
  return User;
};
