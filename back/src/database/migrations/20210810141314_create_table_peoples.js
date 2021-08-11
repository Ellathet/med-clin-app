
exports.up = function(knex) {
  return knex.schema.createTable('people' ,(table) => {
    table.increments('ID')
    table.string('NAME').notNullable()
    table.string('FUNCTION')
    table.string('TYPE', 1) //M = Medic P = Patient
    table.string('EMAIL').unique()
    //Apenas números:
    table.string('CPF').unique()
    table.string('RG').unique()
    //
    table.date('BIRTH')
    table.string('PASSWORD')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('people')
};
