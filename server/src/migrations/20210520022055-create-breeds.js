'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('breeds', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('breeds')
  }
};
