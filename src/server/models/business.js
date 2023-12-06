'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Business.hasMany(models.Order, {
        foreignKey: "business_id",
        as: "vendor"
      })
    }
  }
  Business.init({
    vendor_id: DataTypes.INTEGER,
    business_name: DataTypes.STRING,
    registration_number: DataTypes.STRING,
    date_registered: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    lga: DataTypes.STRING,
    state: DataTypes.STRING,
    status: 
    {
      type: DataTypes.ENUM('pending', 'active', 'blocked', 'deleted'),
      defaultValue: 'pending'
    },
    bio: DataTypes.STRING,
    level: 
    { type: DataTypes.INTEGER,
      defaultValue: 0 
    },
    verified: 
    { type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};