'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Order_Items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'order_item-to-order-association',
      references: {
        table: 'Orders',
        field: 'id'

      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Order_Items', 'order_item-to-order-association')
  }
};
