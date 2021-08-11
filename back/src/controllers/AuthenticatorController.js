const knex = require("../database")
const argon2 = require('argon2')


module.exports = {

    async login(req, res, next) {

        const { email, password } = req.body

        try {

            const people = 
            await knex('people')
                .where('EMAIL', email) 

             if(people.length === 0) {
                return res.status(404).send()
            } else if (await argon2.verify(people[0].PASSWORD, password)) {
                
                return res.status(200).send(people)
            } else {
                return res.status(401).send()
            }

        } catch (error) {
            console.log(error)
            next(error)
        }


    }
}