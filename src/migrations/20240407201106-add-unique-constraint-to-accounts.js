/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Accounts", {
      type: "unique",
      fields: ["userId", "name"],
      name: "unique_accounts_name_for_each_user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Accounts",
      "unique_accounts_name_for_each_user"
    );
  },
};
