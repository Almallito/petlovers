const Sequelize = require('sequelize')
const conn = require('../config/sequelize')

const { Model, DataTypes } = Sequelize

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
    urlFoto: {
        type: DataTypes.STRING(255)
    }
}

class Users extends Model {}
Users.init(schema, {
    sequelize: conn,
    modelName: 'users',
    freezeTableName: true
});

module.exports = Users;