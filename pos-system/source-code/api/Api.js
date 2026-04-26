'use strict'

const restify = require('restify')
const server = restify.createServer()
const corsMiddleware = require('restify-cors-middleware2')

server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())
server.pre(cors.preflight)
server.use(cors.actual)

const status = {
    'ok': 200,
    'created': 201,
    'notModified': 304,
    'notFound': 404
  }
  
const defaultPort = 8080
//示範用的資料庫
const customerUser = [{
    tableNumber: 1,
}, {
    tableNumber: 2,
}, {
    tableNumber: 3,
  }]
//此處讀取資料庫
const menu = require('./menu')

//顧客登錄api
app.post('/api/login', (req, res) => {
    User.findOne({ tableNumber: req.body.tableNumber }, (err, user) => {
      if (err) throw err
      if (!user) res.status(401).send('The table does not exist!')
    })
})

//菜單api
app.get('/api/menu', (req, res) => {
    Menu.find({}, (err, menuItems) => {
      if (err) throw err
      res.json(menuItems)
    })
  })