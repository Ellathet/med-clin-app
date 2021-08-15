const express = require('express')
const routes = express.Router()

const PeopleController = require('./controllers/PeopleController') 
const AppointmentController = require('./controllers/AppointmentsController') 
const AuthenticatorController = require('./controllers/AuthenticatorController') 
const MedicAppointmentsController = require('./controllers/MedicAppointmentsController')

routes.get('/people', PeopleController.index)
routes.post('/people', PeopleController.create)
routes.put('/people', PeopleController.update)
routes.delete('/people', PeopleController.delete)

routes.get('/appointment', AppointmentController.index)
routes.post('/appointment', AppointmentController.create)
routes.put('/appointment', AppointmentController.update)
routes.delete('/appointment', AppointmentController.delete)
routes.get('/appointment/medic', MedicAppointmentsController.indexMedic)

routes.get('/login', AuthenticatorController.login)

routes.get('/me', AuthenticatorController.userConfirm) 
routes.get('/people/medic', PeopleController.medicUser)



module.exports = routes