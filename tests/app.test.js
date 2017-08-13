var request = require('supertest')

var app = require("../app")

var contentTypeHeader = 'Content-Type'
var contentTypePlainText = 'text/plain; charset=utf-8'


describe('app.js - GET /', function(){
  it('Default GET returns 200', function(done){
    request(app)
      .get('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Wait GET returns text wait message', function(done){
    var wait = 50

    request(app)
      .get('/?wait='+wait)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done)
  })
})

describe('app.js - POST /', function(){
  it('Default POST returns 200', function(done){
    request(app)
      .post('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Text Wait POST returns text wait message', function(done){
    var wait = 50

    request(app)
      .post('/')
      .send('wait='+wait)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done)
  })

  it('JSON Wait POST returns text wait message', function(done){
    var wait = 50

    request(app)
      .post('/')
      .send({wait: wait})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done)
  })
})

describe('app.js - PUT /', function(){
  it('Default PUT returns 200', function(done){
    request(app)
      .put('/')
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, done)
  })

  it('Text Wait PUT returns text wait message', function(done){
    var wait = 50

    request(app)
      .put('/')
      .send('wait='+wait)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done)
  })

  it('JSON Wait PUT returns text wait message', function(done){
    var wait = 50

    request(app)
      .put('/')
      .send({wait: wait})
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done)
  })
})