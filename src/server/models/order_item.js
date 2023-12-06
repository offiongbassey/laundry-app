'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Order_Item.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order_items'
     })
    }
  }
  Order_Item.init({
    order_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    product_type: DataTypes.STRING,
    product_image: DataTypes.STRING,
    product_name: DataTypes.STRING,
    amount: DataTypes.FLOAT

  }, {
    sequelize,
    modelName: 'Order_Item',
  });
  return Order_Item;
};