'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Service, {
        foreignKey: 'product_id',
        as: 'product'
      })
    }
  }
  Product.init({
    admin_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug_url: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'disabled', 'deleted'),
      defaultValue: 'active'
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    }

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};