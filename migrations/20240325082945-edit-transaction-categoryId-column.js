/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Change categoryId column of transaction to set association with category
    await queryInterface.changeColumn("Transactions", "categoryId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Transactions", "categoryId", {
      type: Sequelize.UUID,
    });
  },
};
