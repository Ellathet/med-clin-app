const argon2 = require('argon2')

module.exports = {
    async Cryptography(password) {
    try {
        const hash = await argon2.hash(password)

        return hash
    } catch (error) {
        console.log(error)
    }
}}