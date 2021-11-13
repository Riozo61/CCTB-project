'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Project.init({
    projectName: DataTypes.STRING,
    status: DataTypes.STRING,
    contract: DataTypes.STRING,
    estimation: DataTypes.FLOAT,
    dateStart: DataTypes.DATEONLY,
    dateEnd: DataTypes.DATEONLY,
    projManager: DataTypes.STRING,
    customer: DataTypes.STRING,
    customerName: DataTypes.STRING,
    payment: DataTypes.STRING,
    currency: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};