'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    role:  {
      type: DataTypes.ENUM('super-admin', 'admin'),
      defaultValue
    },
    status: DataTypes.ENUM('pending', 'active', 'blocked', 'deleted'),
    defaultValue: 'pending'
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};