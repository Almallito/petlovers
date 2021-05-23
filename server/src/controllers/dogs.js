const ModelDogs = require('../models/dogs')
const ModelBreeds = require('../models/breeds')
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const { Op } = require('sequelize')

async function postDogs(req, res) {
    try {
        const { dog_id } = req.params
        const { tokenInfo, ...values } = req.body

        if (dog_id) {
            const dog = await ModelDogs.upsert({ id: dog_id, ...values })
            return res.status(200).json(dog[0].dataValues)
        } else {
            const dog = await ModelDogs.create({ userId: tokenInfo.userId, idade: Number(values.idade), ...values,})
            return res.status(200).json(dog)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function upload(req, res) {
    try {
        const { key } = req.file
        const url = `${process.env.APP_URL}/files/${key}`
        return res.status(200).json({urlFoto: url});

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function getDog(req, res) {
    try {
        const { dog_id } = req.params
        const { vermifugado, castrado, breedId, userId } = req.query
        if (dog_id) {
            const dog = await ModelDogs.findByPk(dog_id)
            if (!dog) return res.status(400).json({ erro: 'Cachorro não existe' })

            const breed = await ModelBreeds.findByPk(dog.breedId)
            dog.breed = breed

            return res.status(200).json(dog)

        } else if (vermifugado || castrado || breedId || userId) {

            const condition = {
                [Op.and]: {}
            }

            console.log(userId)

            if (vermifugado) condition[Op.and].vermifugado = !!vermifugado
            if (castrado) condition[Op.and].castrado = !!castrado
            if (breedId) condition[Op.and].breedId = Number(breedId)
            if (userId) condition[Op.and].userId = Number(userId)

            const dog = await ModelDogs.findAll({ where: condition })

            if (dog.length > 0) {
                await Promise.all(dog.map(async d => {
                    const { dataValues: dog } = d
                    dog.breed = await ModelBreeds.findByPk(dog.breedId)
                    return dog
                }))
            }

            return res.status(200).json(dog)
        } else {

            const dogs = await ModelDogs.findAll()

            if (dogs.length > 0) {
                await Promise.all(dogs.map(async d => {
                    const { dataValues: dog } = d
                    dog.breed = await ModelBreeds.findByPk(dog.breedId)
                    return dog
                }))
            }
            return res.status(200).json(dogs)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function deleteDog(req, res) {
    try {
        const { dog_id } = req.params
        const dog = await ModelDogs.findByPk(dog_id)
        if (!dog) return res.status(400).json({ erro: 'Cachorro não existe' })

        //Verifica se o dog tem alguma foto e deleta ela
        if (dog.urlFoto) {
            const name = dog.urlFoto.split('/files/')[1]
            const caminho = path.resolve(__dirname, "..", "uploads", name)
            await fs.stat(caminho, function(err, stats) {
                if (err) {
                    return res.status(400).json({ erro: err })
                }
                fs.unlink(caminho, function(err) {
                    if (err) return res.status(400).json({ erro: err })
                })
            })
        }



        await ModelDogs.destroy({ where: { id: dog_id } })
        return res.status(200).json(dog)

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

module.exports = { postDogs, upload, getDog, deleteDog }