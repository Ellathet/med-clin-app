const express = require('express')
const routes = express.Router()
const knex = require('./database');

const PeopleController = require('./controllers/PeopleController') 

routes.get('/people', PeopleController.index)
routes.post('/people', PeopleController.create)
routes.put('/people:id', PeopleController.update)
routes.delete('/people:id', PeopleController.delete)

module.exports = routes