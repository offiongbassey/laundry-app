'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   await queryInterface.addConstraint('Products', {
    fields: ['admin_id'],
    type: 'foreign key',
    name: 'admin_product_association',
    references: {
      table: 'Admins',
      field: 'id'
    }
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Products', 'admin_product_association')
  }
};