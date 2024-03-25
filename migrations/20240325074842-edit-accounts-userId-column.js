/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Change userId column of accounts to set association with user
    await queryInterface.changeColumn("Accounts", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Accounts", "userId", {
      type: Sequelize.UUID,
    });
  },
};
