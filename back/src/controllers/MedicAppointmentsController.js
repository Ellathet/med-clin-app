const knex = require("../database")

module.exports = {
    async indexMedic(req, res, next) {

        try {

            const result = await knex('appointments')
                                .where("MEDIC_ID", req.query.search_id)
            return res.json(result)
            
        } catch (error) {
            next(error)
        }
    },
}