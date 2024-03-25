/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Change accountId column of transactions to set association with account
    await queryInterface.changeColumn("Transactions", "accountId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Accounts",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Transactions", "accountId", {
      type: Sequelize.UUID,
    });
  },
};
