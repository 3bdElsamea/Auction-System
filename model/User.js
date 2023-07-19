const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DBConnection.js');
const bcrypt = require("bcrypt");

const User = sequelize.define('User', {
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    balance:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    pending_balance:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    false_bids:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
}, {
    tableName:"users",
    /*hooks:{
        beforeCreate: async (admin) => {
            if (admin.password) {
                const salt = await bcrypt.genSaltSync(10);
                admin.password = bcrypt.hashSync(admin.password, salt);
            }
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('password')) {
                const salt = await bcrypt.genSaltSync(10);
                admin.password = bcrypt.hashSync(admin.password, salt);
            }
        },
    }*/
});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();

module.exports = User;