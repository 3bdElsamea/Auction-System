"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert("Admins", [
      {
        name: "Super Admin",
        slug: "super-admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
