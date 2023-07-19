"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
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
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          is: {
            //     at least 3 characters long with only letters and spaces
            args: [/^[a-zA-Z ]{3,}$/],
          },
        },
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
        validate: {
          is: {
            // args: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/],
          },
        },
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
