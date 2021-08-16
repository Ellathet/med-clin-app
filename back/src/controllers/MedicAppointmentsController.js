const knex = require("../database")

module.exports = {
    async indexMedic(req, res, next) {

        try {
            if(req.query.search_param === 'M') {
                const result = await knex('appointments')
                        .where("MEDIC_ID", req.query.search_id)
                return res.json(result)
            }else if(req.query.search_param === 'P') {
                const result = await knex('appointments')
                    .where("PATIENT_ID", req.query.search_id)
                return res.json(result)
            }

            
        } catch (error) {
            next(error)
        }
    },
}