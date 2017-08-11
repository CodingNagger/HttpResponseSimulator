var url = require('url')
var processQuery = require('./processors/text-processor')

var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  var query = url.parse(req.url, true).query

  res.send(processQuery(query))
})

app.post('/', function (req, res) {
  res.send(processQuery(req.body))
})

app.put('/', function (req, res) {
  res.send(processQuery(req.body))
})

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Http Client Simulator listening at http://%s:%s", host, port)
})

module.exports = app