const jwt = require('jsonwebtoken'); 
const secret = 'Signature'


module.exports = {

    async CreateToken(user) {
            const token = await jwt.sign({user: user.ID}, secret, { expiresIn: 86400})
        return token
    },
    async DecodeToken(token) {
            const verify = await jwt.verify(token, secret)
    }
}