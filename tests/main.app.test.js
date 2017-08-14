var request = require('supertest')

const main = require("../main")

var contentTypeHeader = 'Content-Type'
var contentTypePlainText = 'text/plain; charset=utf-8'

describe('main.js - GET /', function(){
  it('Default GET returns 200', function(done){
    request(main.app)
      .get('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Echo', function(done){
    var echo = 'getEcho'

    request(main.app)
      .get('/?echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})

describe('app.js - POST /', function(){
  it('Default POST returns 200', function(done){
    request(main.app)
      .post('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Echo form', function(done){
    var echo = 'postEchoForm'

    request(main.app)
      .post('/')
      .send('echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })

  it('Echo json', function(done){
    var echo = 'postEchoJson'

    request(main.app)
      .post('/')
      .send({echo: echo})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})

describe('app.js - PUT /', function(){
  it('Default PUT returns 200', function(done){
    request(main.app)
      .put('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Echo form', function(done){
    var echo = 'putEchoForm'

    request(main.app)
      .put('/')
      .send('echo='+echo)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })

  it('Echo json', function(done){
    var echo = 'putEchoForm'

    request(main.app)
      .put('/')
      .send({echo: echo})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, echo, done)
  })
})