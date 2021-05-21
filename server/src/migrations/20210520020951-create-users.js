'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)

      },
      senha: {
        type: Sequelize.STRING(255)
      },
      urlFoto: {
        type: Sequelize.STRING(255)
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
