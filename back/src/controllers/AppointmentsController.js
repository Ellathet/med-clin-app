const { parseISO } = require("date-fns")
const knex = require("../database")

module.exports = {
    async index(req, res) {
       const results = await knex('appointments')

        return res.json(results)
    },

    async create(req, res, next) {

        const { medic_id, patient_id, scheduling, description, medic_name, patient_name} = req.body

        console.log(req.body.medic_id)

        try {
            await knex('appointments').insert(
                {
                    MEDIC_ID: medic_id,
                    MEDIC_NAME: medic_name,
                    PATIENT_ID: patient_id,
                    PATIENT_NAME: patient_name,
                    SCHEDULING: parseISO(scheduling),
                    DESCRIPTION: description,
                }
            )

            return res.status(200).send()

        } catch (error) {
            console.log(error)
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