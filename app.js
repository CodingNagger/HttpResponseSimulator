var url = require('url')
var processQuery = require('./processor')
var handleResponse = require('./response-handlers/plain-text')

var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  var query = url.parse(req.url, true).query

  handleResponse(processQuery(query), res)
})

app.post('/', function (req, res) {
  handleResponse(processQuery(req.body), res)
})

app.put('/', function (req, res) {
  handleResponse(processQuery(req.body), res)
})

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Http Client Simulator listening at http://%s:%s", host, port)
})

module.exports = app