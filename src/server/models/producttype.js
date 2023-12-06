'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    ProductType.belongsTo(models.Service, {
      foreignKey: 'product_type_id',
      as: 'product_type'
    })
    }
  }
  ProductType.init({
    admin_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'disabled', 'deleted'),
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};