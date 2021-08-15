
exports.up = function(knex) {
    return knex.schema.createTable('appointments' ,(table) => {
        table.increments('ID')

        table.integer('MEDIC_ID')
            .notNullable()
        table.string('MEDIC_NAME')
        table.integer('PATIENT_ID')
            .notNullable()
        table.string('PATIENT_NAME')
        table.string('DESCRIPTION')

        table.date('SCHEDULING')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('appointments')
};
