const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DBConnection.js');
const User = require('./User.js');
const Item = require('./Item.js');
const Auction = require('./Auction.js');

const Bid = sequelize.define('Bid', {
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    item_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    auction_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },

}, {
    tableName:"bids",
});

const Item_bid_condition = sequelize.define('item_bid_condition', {
    item_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    auction_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    start_time:{
        type:DataTypes.DATE,
        allowNull:false
    },
    duration:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    start_amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    minimum_bidding_amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    close_price:DataTypes.INTEGER,

},
{
    tableName:"items_bid_condition",
});


// Bid Relations
Bid.belongsTo(User, {foreignKey: 'id'});
User.hasMany(Bid, {foreignKey: 'user_id'});

Bid.belongsTo(Item, {foreignKey: 'id'});
Item.hasMany(Bid, {foreignKey: 'item_id'});

Bid.belongsTo(Auction, {foreignKey: 'reference_number'});
Auction.hasMany(Bid, {foreignKey: 'auction_id'});

// Items Bid Condition Relations
Item_bid_condition.belongsTo(Item, {foreignKey: 'id'});
Item.hasOne(Item_bid_condition, {foreignKey: 'item_id'});

Item_bid_condition.belongsTo(Auction, {foreignKey: 'reference_number'});
Auction.hasMany(Item_bid_condition, {foreignKey: 'auction_id'});



(async () => {
    await sequelize.sync({ force: true });
    // Code here

})();


module.exports = Bid;