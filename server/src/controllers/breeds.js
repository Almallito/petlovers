const ModelBreeds = require('../models/breeds')

async function postBreed(req,res){
    try {
        const {breed_id} = req.params
        const values = req.body

        if (breed_id) {
            const breed = await ModelBreeds.upsert({ id: breed_id, ...values })
            return res.status(200).json(breed[0].dataValues)
        } else {
            const breed = await ModelBreeds.create(values)
            return res.status(200).json(breed)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function getBreed(req, res) {
    try {
        const { breed_id } = req.params
        if (breed_id) {
            const breed = await ModelBreeds.findByPk(breed_id)
            if (!breed) return res.status(400).json({ erro: 'Raça não existe' })
            return res.status(200).json(breed)
        } else {
            const breeds = await ModelBreeds.findAll()
            return res.status(200).json(breeds)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function deleteBreed(req, res) {
    try {
        const { breed_id } = req.params
        const breed = await ModelBreeds.findByPk(breed_id)
        if (!breed) return res.status(400).json({ erro: 'Raça não existe' })


        await ModelBreeds.destroy({ where: { id: breed_id } })
        return res.status(200).json(breed)

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

module.exports = {postBreed, deleteBreed, getBreed}