const Sequelize = require('sequelize')
const conn = require('../config/sequelize')

const user = require('./users')

const {Model, DataTypes} = Sequelize

schema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}

class Breeds extends Model { }
Breeds.init(schema, {
    sequelize: conn,
    modelName: 'breeds',
    freezeTableName: true,
});

module.exports = Breeds;
