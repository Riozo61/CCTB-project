'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cost.init({
    estimation: DataTypes.FLOAT,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    project:DataTypes.STRING,
    currency:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};