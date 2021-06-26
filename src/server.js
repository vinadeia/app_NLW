const express = require ('express')
const route = require('./route')
const path = require('path')
// path é um módulo, que representa o caminho do projeto

const server = express()

server.set('view engine', 'ejs')
// 'view engine' será o arquivo 'ejs'

server.use(express.static("public"))
// server usa o conteúdo da pasta public (onde o conteúdo pode ser acessado por todo o projeto)

server.set('views', path.join(__dirname, 'views')) 
// join é uma funcionalidade do path que junta o caminho dele 
//com parâmetro que é setado dentro dele ( nesse caso o __dirname)
// __dirname, é a pasta mãe do arquivo que ela foi declarada

server.use(express.urlencoded({extended: true}))
//pega o conteudo que vem do formulario, decodifica e passa para o controller

server.use(route)
// server usa a rota

server.listen(3000, () => console.log ("rodando"))
// listen função do express onde o servidor executa as requisições, na porta definida

