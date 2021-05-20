const Sequelize = require('sequelize')
const conn = require('../config/sequelize')

const user = require('./users')
const breed = require('./breeds')

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
    urlFoto: {
        type: DataTypes.STRING(255)
    },
    idade: {
        type: DataTypes.INTEGER
    },
    vermifugado: {
        type: DataTypes.BOOLEAN
    },
    castrado: {
        type: DataTypes.BOOLEAN
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    breedId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

class Dogs extends Model { }
Dogs.init(schema, {
    sequelize: conn,
    modelName: 'dogs',
    freezeTableName: true
});

Dogs.belongsTo(user, {foreignKey: 'userId', allowNull: false})
Dogs.belongsTo(breed, {foreignKey: 'breedId', allowNull: false})

module.exports = Dogs;
