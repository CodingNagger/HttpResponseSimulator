var request = require('supertest')

const main = require("../main")

var contentTypeHeader = 'Content-Type'
var contentTypePlainText = 'text/plain; charset=utf-8'
var skyneatResponse = '<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n\t\t<meta name="theme-color" content="#ff0024">\n\t\t<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n\t\t<link rel="icon" href="/favicon.ico" type="image/x-icon">\n\t\t<title>Skyneat</title>\n\t\t<style type="text/css">\n\t\t\tbody {background: #ff0024; text-align: center;}\n\t\t</style> \n\t</head>\n\n\t<body>\n\t\t<img src="img/skyneat_1000x1000.png" width="400" />\n\t</body>\n</html>\n'

describe('main.js - GET /', function(){
  it('Default GET returns 200', function(done){
    request(main.app)
      .get('/')
      .expect(200, done)
  })
})

describe('main.js - GET /api', function(){
  it('Default GET returns 200', function(done){
    request(main.app)
      .get('/api')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Default responseUrl works', function(done){
    request(main.app)
      .get('/api?responseUrl='+encodeURI('http://skyneat.io'))
      .expect(200, skyneatResponse, done)
  })

  it('Echo', function(done){
    var echo = 'getEcho'

    request(main.app)
      .get('/api?echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})

describe('app.js - POST /api', function(){
  it('Default POST returns 200', function(done){
    request(main.app)
      .post('/api')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Echo form', function(done){
    var echo = 'postEchoForm'

    request(main.app)
      .post('/api')
      .send('echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })

  it('Echo json', function(done){
    var echo = 'postEchoJson'

    request(main.app)
      .post('/api')
      .send({echo: echo})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})

describe('app.js - PUT /', function(){
  it('Default PUT returns 200', function(done){
    request(main.app)
      .put('/api')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Echo form', function(done){
    var echo = 'putEchoForm'

    request(main.app)
      .put('/api')
      .send('echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })

  it('Echo json', function(done){
    var echo = 'putEchoForm'

    request(main.app)
      .put('/api')
      .send({echo: echo})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})