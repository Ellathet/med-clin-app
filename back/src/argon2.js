const argon2 = require('argon2')

module.exports = {
    async Cryptography(password) {
    try {

        return argon2.hash(password).then((response) => response)
    } catch (error) {
        console.log(error)
    }
}}

