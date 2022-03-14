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
      // define association here
    }
  };
  Order.init({
    orderName: DataTypes.STRING,
    supplier: DataTypes.STRING,
    project: DataTypes.STRING,
    measure: DataTypes.STRING,
    shopName: DataTypes.STRING,
    brand: DataTypes.STRING,
    quantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};