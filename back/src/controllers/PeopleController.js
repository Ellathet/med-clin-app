const knex = require("../database")

module.exports = {
    async index(req, res) {
       const results = await knex()

        return res.json(results)
    }
}