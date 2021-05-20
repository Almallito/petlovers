const ModelDogs = require('../models/dogs')
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

async function postDogs(req,res){
    try {
        const {dog_id} = req.params
        const {tokenInfo, ...values} = req.body

        if (dog_id) {
            const dog = await ModelDogs.upsert({ id: dog_id, ...values })
            return res.status(200).json(dog[0].dataValues)
        } else {
            const dog = await ModelDogs.create({...values,userId: tokenInfo.userId})
            return res.status(200).json(dog)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function upload(req, res) {
    try {
        const { key } = req.file
        const { dog_id } = req.params

        const dog = await ModelDogs.findByPk(dog_id)
        if(!dog) return res.status(400).json({ erro: 'Id informado não encontrado' })

        const url = `${process.env.APP_URL}/files/${key}`

        await ModelDogs.update({urlFoto: url}, {where: { id: dog_id}})

        return res.status(200).json(dog);

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function getDog(req, res) {
    try {
        const { dog_id } = req.params
        if (dog_id) {
            const dog = await ModelDogs.findByPk(dog_id)
            if (!dog) return res.status(400).json({ erro: 'Cachorro não existe' })
            return res.status(200).json(dog)
        } else {
            const dogs = await ModelDogs.findAll()
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
        if(dog.urlFoto){
            const name = dog.urlFoto.split('/files/')[1]
            const caminho = path.resolve(__dirname, "..","uploads", name)
            await fs.stat(caminho, function (err, stats) {
                if (err) {
                    return res.status(400).json({ erro: err })
                }
                fs.unlink(caminho,function(err){
                     if(err) return res.status(400).json({ erro: err })
                })
             })
        }

        

        await ModelDogs.destroy({ where: { id: dog_id } })
        return res.status(200).json(dog)

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

module.exports = {postDogs, upload, getDog, deleteDog}