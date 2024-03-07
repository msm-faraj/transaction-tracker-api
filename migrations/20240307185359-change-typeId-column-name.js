"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transactions", "typeId", "type");
    await queryInterface.renameColumn("Accounts", "typeId", "type");
    await queryInterface.renameColumn("Categories", "typeId", "type");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Transactions", "type", "typeId");
    await queryInterface.renameColumn("Accounts", "type", "typeId");
    await queryInterface.renameColumn("Categories", "type", "typeId");
  },
};
