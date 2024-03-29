/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Change userId column of categories to set association with user
    await queryInterface.changeColumn("Categories", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Categories", "userId", {
      type: Sequelize.UUID,
    });
  },
};
