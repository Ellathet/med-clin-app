const knex = require("../database")

module.exports = {
    async index(req, res) {
       const results = await knex('appointments')

        return res.json(results)
    },
    async create(req, res, next) {

        const { medic_id, patient_id, appointment } = req.body

        try {
            await knex('appointment').insert(
                {
                    MEDIC_ID: medic_id,
                    PATIENT_ID: patient_id,
                    APPOINTMENT: appointment
                }
            )

            return res.status(201).send()

        } catch (error) {
            next(error)
        }           
    },
    async update(req, res, next) {

        const { medic_id, patient_id, appointment, id } = req.body

        try {
            await knex('appointment')
            .update(
                {
                    MEDIC_ID: medic_id,
                    PATIENT_ID: patient_id,
                    APPOINTMENT: appointment
                }
            )
            .where('ID', id)

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {

            const { id } = req.body

            await knex('appointment')
                  .where('ID', id)
                  .del()

            return res.status(200).send()


        } catch (error) {
            next(error)
        }
    }
}