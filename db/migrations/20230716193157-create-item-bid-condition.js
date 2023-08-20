"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Item_bid_conditions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {
        allowNull: false,
        references: {
          model: "Items",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      auction_id: {
        allowNull: false,
        references: {
          model: "Auctions",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      start_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minimum_bidding_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      current_high_bid: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      close_price: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Item_bid_conditions");
  },
};
