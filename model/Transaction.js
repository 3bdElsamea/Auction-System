const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DBConnection.js');
const User = require('./User.js');

const Transaction = sequelize.define('Transaction', {
    transaction_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    method: {
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
}, {
    tableName:"transactions",
});

Transaction.belongsTo(User, {foreignKey: 'id'});
User.hasMany(Transaction, {foreignKey: 'user_id'});

module.exports = Transaction;