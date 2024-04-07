/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Categories", {
      type: "unique",
      fields: ["userId", "name", "type"],
      name: "unique_categories_name_&_type_for_each_user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Categories",
      "unique_categories_name_&_type_for_each_user"
    );
  },
};
