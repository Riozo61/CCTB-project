'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      contract: {
        type: Sequelize.STRING
      },
      estimation: {
        type: Sequelize.FLOAT
      },
      dateStart: {
        type: Sequelize.DATEONLY
      },
      dateEnd: {
        type: Sequelize.DATEONLY
      },
      projManager: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};