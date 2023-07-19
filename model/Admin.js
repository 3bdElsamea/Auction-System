const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DBConnection.js');
const bcrypt = require("bcrypt");

const Admin = sequelize.define('Admin', {
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

}, {
    tableName:"admins",
    /*hooks: {
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

module.exports = Admin;