const express = require('express')
const routes = express.Router()

const PeopleController = require('./controllers/PeopleController') 
const AppointmentController = require('./controllers/AppointmentsController') 
const AuthenticatorController = require('./controllers/AuthenticatorController')

routes.get('/people', PeopleController.index)
routes.post('/people', PeopleController.create)
routes.put('/people', PeopleController.update)
routes.delete('/people', PeopleController.delete)

routes.get('/appointment', AppointmentController.index)
routes.post('/appointment', AppointmentController.create)
routes.put('/appointment', AppointmentController.update)
routes.delete('/appointment', AppointmentController.delete)

routes.post('/login', AuthenticatorController.login)


module.exports = routes