'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Materials.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    supplier: DataTypes.STRING,
    measure: DataTypes.STRING,
    shopName: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materials',
  });
  return Materials;
};