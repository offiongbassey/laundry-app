'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendor.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: 
    { type: DataTypes.ENUM('male', 'female'), 
      allowNull: false
    },
    status: 
    { type: DataTypes.ENUM('pending', 'active', 'blocked', 'deleted'),
      defaultValue: 'pending' 
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false },
    role: 
    { type: DataTypes.ENUM('vendor'), 
      defaultValue: 'vendor' 
    }
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};