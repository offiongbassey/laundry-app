'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Order_Items', 'amount', {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false
   },
   await queryInterface.addColumn('Order_Items', 'product_name', {
    type: DataTypes.STRING,
   },
   await queryInterface.addColumn('Order_Items', 'product_image', {
    type: DataTypes.STRING, 
   },
   await queryInterface.addColumn('Order_Items', 'product_type', {
    type: DataTypes.STRING,
   })
   )
   )
   );
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Order_Items', 'amount'),
   await queryInterface.removeColumn('Order_Items', 'product_name'),
   await queryInterface.removeColumn('Order_Items', 'product_image'),
   await queryInterface.removeColumn('Order_Items', 'prodcut_type')
  }
};
