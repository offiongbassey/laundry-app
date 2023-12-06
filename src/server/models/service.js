'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      },
      Service.belongsTo(models.ProductType, {
        foreignKey: 'product_type_id',
        as: 'product_type'
      }))
    }
  }
  Service.init({
    business_id: DataTypes.INTEGER,
    vendor_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_type_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: 
    {
     type: DataTypes.STRING,
     defaultValue: "active"
    },
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};