/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  remove type column from acount table
    await queryInterface.removeColumn("Accounts", "type");
  },

  async down(queryInterface, Sequelize) {
    //  add type column from acount table
    await queryInterface.addColumn("Accounts", "type");
  },
};
