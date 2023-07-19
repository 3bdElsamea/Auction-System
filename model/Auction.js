const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DBConnection.js');

const Auction = sequelize.define('Auction', {
    reference_number:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false

    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    entry_fees:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.VIRTUAL,
        get(){
            const currentDate = new Date();
            if(currentDate > this.end_date){
                return "Completed";
            }
            else if(currentDate > this.start_date){
                return "Ongoing";
            }
            else{
                return "Upcoming";
            }
        }
    }
}, {
    tableName:"auctions",
});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();

module.exports = Auction;