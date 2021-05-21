const bcrypt = require('bcrypt')
const ModelUser = require('../models/users')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

async function authUser(req, res) {
    try {
        const { email, senha } = req.body
        const salt = process.env.BCRYPT_SALT

        const { dataValues: user } = await ModelUser.findOne({ where: { email } })
        if (!user) return res.status(400).json({ erro: 'Usuario não cadastrado' })

        if (bcrypt.hashSync(senha, salt) === user.senha) {
            const hash = process.env.JWT_TOKEN
            const token = jwt.sign({ userId: user.id, userEmail: user.email }, hash, {
                expiresIn: '12h',
            })
            delete user.senha
            user.token = token
            return res.status(200).json(user)
        } else {
            return res.status(400).json({ erro: 'Email ou Senha Incorreto' })
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function getUser(req, res) {
    try {
        const { user_id } = req.params
        if (user_id) {
            const user = await ModelUser.findByPk(user_id)
            if (!user) return res.status(400).json({ erro: 'Usuario não existe' })
            return res.status(200).json(user)
        } else {
            const users = await ModelUser.findAll()
            return res.status(200).json(users)
        }

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function postUser(req, res) {
    try {
        const { user_id } = req.params
        const values = req.body

        if (user_id) {
            const salt = process.env.BCRYPT_SALT
            values.senha = await bcrypt.hashSync(values.senha, salt)
            await ModelUser.upsert({ id: user_id, ...values })
            const user = await ModelUser.findByPk(user_id)
            delete user.senha
            return res.status(200).json(user)
        } else {
            return res.status(400).json({ erro: 'Id de usuario não informado' })
        }
    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function register(req, res) {
    try {
        const values = req.body

        const searchUser = await ModelUser.findAll({ where: { email: values.email } })
        if (searchUser.length > 0) return res.status(400).json({ erro: 'Email já cadastrado' })

        const salt = process.env.BCRYPT_SALT
        values.senha = await bcrypt.hashSync(values.senha, salt)
        const { dataValues: { senha, ...user } } = await ModelUser.create(values)
        return res.status(200).json(user)

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}

async function validToken(req, res) {
    try {
        const { token } = req.body
        const hash = process.env.JWT_TOKEN

        await jwt.verify(token, hash, async(err, decoded) => {
            if (err) return res.status(401).json({ token: false })
            return res.status(200).json({ token: true })
        })

    } catch (err) {
        return res.status(400).json({ erro: err })

    }
}

async function deleteUser(req, res) {
    try {
        const { user_id } = req.params

        const user = await ModelUser.findByPk(user_id)
        if (!user) return res.status(400).json({ erro: 'Usuario não existe' })

        await ModelUser.destroy({ where: { id: user_id } })
        delete user.senha
        return res.status(200).json(user)

    } catch (err) {
        return res.status(400).json({ erro: err })
    }
}



module.exports = { authUser, getUser, postUser, deleteUser, register, validToken }