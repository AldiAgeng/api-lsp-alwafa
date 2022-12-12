'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Administrators', 'username', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Administrators', 'password', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Administrators', 'username');
    await queryInterface.removeColumn('Administrators', 'password');
  }
};
