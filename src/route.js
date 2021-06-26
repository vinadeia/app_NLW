const express = require ('express')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))    // req == requisição da rota  res == response
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.get('/room/:room', (req, res) => res.render("room"))

//Formato que o formulatio de dentro da modal tem que passar a informação
route.post('/question/:room/:question/:action', questionController.index)
route.post('/create-room', roomController.create)

module.exports = route  //exporta o arquivo route

