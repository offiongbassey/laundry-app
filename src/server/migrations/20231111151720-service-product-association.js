'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Services', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'service-product-association',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Services', 'service-product-association')
  }
};
