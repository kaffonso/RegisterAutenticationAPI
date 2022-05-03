const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const ProjectController = require('./app/controllers/ProjectController')
const authMiddleware = require('./app/middlewares/auth')


routes.get('/', UserController.read) // mostrar lista  de usuario
routes.post('/register', UserController.create) // registrar um usuario
routes.post('/authenticate', UserController.authenticate) // login de usuario 

routes.use(authMiddleware) // midleware para verificacao do token

routes.get('/main',authMiddleware, ProjectController.main) 


module.exports = routes