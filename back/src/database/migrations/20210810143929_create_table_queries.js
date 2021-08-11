
exports.up = function(knex) {
    return knex.schema.createTable('appointments' ,(table) => {
        table.increments('ID')

        table.integer('MEDIC_ID')
            .references('people.ID')
            .notNullable()
            .onDelete('CASCADE')
        table.integer('PATIENT_ID')
            .references('people.ID')
            .notNullable()
            .onDelete('CASCADE')
        table.string('DESCRIPTION')

        table.date('APPOINTMENT')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('appointments')
};
