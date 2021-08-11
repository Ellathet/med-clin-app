const express = require('express')
const routes = express.Router()
const knex = require('./database');

const PeopleController = require('./controllers/PeopleController') 

routes.get('/people', PeopleController.index)

module.exports = routes