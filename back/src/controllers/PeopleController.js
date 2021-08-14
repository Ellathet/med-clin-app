const knex = require("../database")
const { Cryptography } = require("../argon2")
const { CreateToken } = require("../jwt")
const { parseISO } = require('date-fns')

module.exports = {
    async index(req, res) {
       const results = await knex('people')

        return res.json(results)
    },

    async medicUser(req, res, next) {

        try {

            if(req.query.search_function === "all") {
                const results =  await knex('people')
                .where('TYPE', 'M' )
                .andWhere((qb) => {
                    if(req.query.search_name) {
                        qb.where('people.NAME', 'like', `%${req.query.search}%`)
                    }
                })

                return res.json(results).send()
            } else {
                const results =  await knex('people')
                .where('TYPE', 'M' )
                .andWhere((qb) => {
                    if(req.query.search_name) {
                        qb.where('people.NAME', 'like', `%${req.query.search_name}%`)
                    }
                })
                .andWhere((qb) => {
                    if(req.query.search_function) {
                        qb.where('people.NAME', 'like', `%${req.query.search_function}%`)
                    }
                })

                return res.json(results).send()
            }

        
        } catch (error) {
            console.log(error)
            next(error)
        }
         
     },
    async create(req, res, next) {

        const { name, fun, type, email, cpf, rg, birth, password } = req.body

        try {

            const confirmEmail = await knex('people')
            .where('EMAIL', email)
            .orWhere('CPF', cpf)
            .orWhere('RG', rg)

            if( confirmEmail.length > 0) {

                return res.status(409).send()
            }

            await knex('people')
            .insert(
                {
                    NAME: name,
                    FUNCTION: fun,
                    TYPE: type,
                    EMAIL: email,
                    CPF: cpf,
                    RG: rg,
                    BIRTH: parseISO(birth),
                    PASSWORD: await Cryptography(password)
                }
            )

            const user = await knex('people')
            .where('EMAIL', email)

            return res.status(201).send({user, token: await CreateToken(user[0])})

        } catch (error) {

            console.log(error)
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