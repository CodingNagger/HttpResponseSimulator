var url = require('url')
var processQuery = require('./processor')

var handleResponse = require('./response-handlers/default')
var handlePastebinResponse = require('./response-handlers/pastebin')
var handleEchoResponse = require('./response-handlers/echo')

var request = require('request')
var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  var query = url.parse(req.url, true).query

  handle(query, res, handleResponse)
})

app.post('/', function (req, res) {
  handle(req.body, res, handleResponse)
})

app.put('/', function (req, res) {
  handle(req.body, res, handleResponse)
})

function handle(query, res, defaultHandler) {
  return new Promise((resolve, reject) => {
    var processed = processQuery(query)

    handleEchoResponse(processed, res)
    .then(resolve)
    .catch(
      () => handlePastebinResponse(
      processed, 
      res,
      request
      )
      .then(resolve)
      .catch((reason) => {
        defaultHandler(processed, res)
        .then(resolve)
        .catch(reject)
      })
    )
  })
}

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Http Client Simulator listening at http://%s:%s", host, port)
})

module.exports = {
  app: app,
  handle: handle
}