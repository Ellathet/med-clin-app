const knex = require("../database")
const argon2 = require('argon2')
const { CreateToken, DecodeToken} = require("../jwt")


module.exports = {

    async login(req, res, next) {

        const [, hash] = req.headers.authorization.split(" ")
        const [email, password] = Buffer.from(hash, 'base64').toString().split(":")

        try {

            const people = 
            await knex('people')
                .where('EMAIL', email) 

            if(people.length === 0) return res.status(404).send()

            if (await argon2.verify(people[0].PASSWORD, password)) {
                return res.status(200).send({people, token: await CreateToken(people[0])})
            } else {

                return res.status(401).send()
            }

        } catch (error) {
            console.log(error)
            next(error)
        }

    },

    async userConfirm(req, res, next) {

        if(req.headers.authorization === undefined) {
            res.status(404).send()
        } else {
            try {

                const [, hash] = req.headers.authorization.split(" ")
                const { user : userId} = await DecodeToken(hash) 
    
                const user = 
                await knex('people')
                    .where('ID', userId) 
                
                    return res.status(200).send(user)
            } catch (error) {
                next(error)
            }
        }

    }
} 