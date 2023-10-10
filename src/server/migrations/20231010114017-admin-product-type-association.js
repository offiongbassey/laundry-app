'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProductTypes', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'admin-product-type-association',
      references: {
        table: 'Admins',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('ProductTypes', 'admin-product-type-association');
  }
};
