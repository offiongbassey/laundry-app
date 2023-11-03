'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint('Businesses', {
    fields: ['vendor_id'],
    type: 'foreign key',
    name: 'vendor-business-association',
    references: {
      table: 'Vendors',
      field: 'id'
    }
   })
   
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Businesses', 'vendor-business-association')
  }
};
