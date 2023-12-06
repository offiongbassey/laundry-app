'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Order.hasMany(models.Order_Item, {
      foreignKey: 'order_id',
      as: 'order_items'
     },
     Order.belongsTo(models.Business, {
      foreignKey: 'business_id',
      as: 'vendor'
     })
     )
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    business_id: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    service_charge: DataTypes.INTEGER,
    status: 
    { 
      type: DataTypes.ENUM('pending', 'paid', 'canceled', 'processing', 'deleted', 'delivered', 'rejected'), 
      defaultValue: 'pending'
    },
    note: DataTypes.STRING,
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reference: DataTypes.STRING,
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } }, 
  
  {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};