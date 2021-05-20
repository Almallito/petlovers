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
      rua: {
        type: Sequelize.STRING(255)
      },
      numero: {
        type: Sequelize.STRING(10)
      },
      bairro: {
        type: Sequelize.STRING(255)
      },
      cidade: {
        type: Sequelize.STRING(255)
      },
      estado: {
        type: Sequelize.STRING(2)
      },
      obs: {
        type: Sequelize.STRING(2)
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
