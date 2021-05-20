'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('dogs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      urlFoto: {
        type: Sequelize.STRING(255)
      },
      idade: {
        type: Sequelize.INTEGER
      },
      vermifugado: {
        type: Sequelize.BOOLEAN
      },
      castrado: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      breedId:{
        type: Sequelize.INTEGER,
        references: { model: 'breeds', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dogs')
  }
};
