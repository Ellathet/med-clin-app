const knex = require("../database")
const { Cryptography } = require("../argon2")

module.exports = {
    async index(req, res) {
       const results = await knex('people')

        return res.json(results)
    },
    async create(req, res, next) {

        const { name, fun, type, email, cpf, rg, birth, password } = req.body

        try {
            await knex('people')
            .insert(
                {
                    NAME: name,
                    FUNCTION: fun,
                    TYPE: type,
                    EMAIL: email,
                    CPF: cpf,
                    RG: rg,
                    BIRTH: null,
                    PASSWORD: await Cryptography(password)
                }
            )

            return res.status(201).send()

        } catch (error) {
            next(error)
        }           
    },
    async update(req, res, next) {

        const { name, fun, type, email, cpf, rg, birth, password } = req.body
        const { id } = req.params

        try {
            await knex('people')
            .update()
            .where(id)

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {

            const { id } = req.params

            await knex('people')
                  .where({id})
                  .del()

            return res.status(200).send()


        } catch (error) {
            next(error)
        }
    }
}