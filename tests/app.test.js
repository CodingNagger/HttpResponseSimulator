/*
Arrange
*/

// App
var app = require("../app")

// Dependencies
var request = require('supertest')
var nock = require('nock');

// Variables
var pastebinKey = 'testKey'
var pastebinDomain = 'https://pastebin.com'
var pastebinExpectedPath = '/raw/' + pastebinKey
var pastebinExpectedResponse = 'pastebinExpectedResponse'

var contentTypeHeader = 'Content-Type'
var contentTypePlainText = 'text/plain; charset=utf-8'

// Nock setup
nock(pastebinDomain)
  .get(pastebinExpectedPath)
  .reply(200, pastebinExpectedResponse)

/*
Act and assert
*/

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

  it('Wait GET returns pastebin code when id present', function(done){
    request(app)
      .get('/?pastebinId='+pastebinKey)
      .expect(contentTypeHeader, contentTypePlainText)
      .expect(200, pastebinExpectedResponse, done)
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