const express = require('express')
const multer = require('multer')

const multerConfig = require('./config/multer')
const verifyToken = require('./controllers/verifyToken')

const routes = express.Router();

const DogsController = require('./controllers/dogs')
const UserController = require('./controllers/users')
const BreedController = require('./controllers/breeds')

routes.post('/users/auth', UserController.authUser)

routes.get('/users', verifyToken, UserController.getUser)
routes.get('/users/:user_id', verifyToken, UserController.getUser)
routes.post('/users', verifyToken, UserController.postUser)
routes.post('/users/:user_id', verifyToken, UserController.postUser)
routes.delete('/users/:user_id', verifyToken, UserController.deleteUser)

routes.post("/dogs", verifyToken, DogsController.postDogs)
routes.post("/dogs/:dog_id", verifyToken, DogsController.postDogs)
routes.get("/dogs", verifyToken, DogsController.getDog)
routes.get("/dogs/:dog_id", verifyToken, DogsController.getDog)
routes.delete("/dogs/:dog_id", verifyToken, DogsController.deleteDog)
routes.post("/dogs/photo/:dog_id", verifyToken, multer(multerConfig).single("file"), DogsController.upload)

routes.post("/breeds", verifyToken, BreedController.postBreed)
routes.post("/breeds/:breed_id", verifyToken, BreedController.postBreed)
routes.get("/breeds", verifyToken, BreedController.getBreed)
routes.get("/breeds/:breed_id", verifyToken, BreedController.getBreed)
routes.delete("/breeds/:breed_id", verifyToken, BreedController.deleteBreed)

module.exports = routes;