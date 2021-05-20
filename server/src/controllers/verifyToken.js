const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    try {
        const tokenString = req.headers.authorization

        if (!tokenString) return res.status(401).json({ erro: 'Token Inexistente' })

        const [type, token] = tokenString.split(' ')

        if (!type || type != 'Bearer') return res.status(401).json({ erro: 'Token Type errado' })

        if (!token) return res.status(401).json({ erro: 'Token Invalido' })

        const hash = process.env.JWT_TOKEN
        await jwt.verify(token, hash, (err, decoded) => {
            if (err) return res.status(401).json({ erro: 'Token Expirado' })
            req.body.tokenInfo = decoded
            return next()
        })
        return false
    } catch (err) {
        console.log(err)
        res.status(401).json({ erro: 'Ocorreu um erro ao validar o token' })
        return false
    }
}