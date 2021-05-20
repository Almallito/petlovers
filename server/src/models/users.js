const Sequelize = require('sequelize')
const conn = require('../config/sequelize')

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
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    senha: {
        type: DataTypes.STRING(255)
    },
    rua: {
        type: DataTypes.STRING(255)
    },
    numero: {
        type: DataTypes.STRING(10)
    },
    bairro: {
        type: DataTypes.STRING(255)
    },
    cidade: {
        type: DataTypes.STRING(255)
    },
    estado: {
        type: DataTypes.STRING(2)
    },
    obs: {
        type: DataTypes.STRING(2)
    }
}

class Users extends Model {}
Users.init(schema, {
    sequelize: conn,
    modelName: 'users',
    freezeTableName: true
});

module.exports = Users;
