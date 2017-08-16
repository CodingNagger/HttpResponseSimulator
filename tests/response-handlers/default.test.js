// Tested component
var defaultHandler = require('../../response-handlers/default')

// Variables
var defaultExpectedResponse = 'defaultExpectedResponse'

// Dependencies
var assert = require('assert')
var sinon = require('sinon')

// Mocked dependencies
var successfulRequest = {
    get: function (query, callback){
        callback(undefined, undefined, defaultExpectedResponse)
    }
}

var failedRequest = {
    get: function (query, callback){
        callback({error: 'happened'}, undefined, undefined)
    }
}

// Tests
describe('default.test.js - generateResponse from url', function(){
  it('Succeeds when responseUrl is defined and requests returns body', function(done){
    var res = {
        send: sinon.spy()
    }

    var query = { responseUrl: 'https://blog.iamnguele.com' }

    defaultHandler(query, res, successfulRequest)
        .then((processed) => {
            assert(query.responseUrl === processed.responseUrl, 'responseUrl not passed')
            assert(res.send.calledWith(defaultExpectedResponse), 'response not sent')
            done()
        })
        .catch(done)
  })

  it('Does not make request but calls failure when pastebinId is not defined', function(done){
    defaultHandler({}, undefined, undefined)
        .then(() => { assert(false, 'should not succeed') })
        .catch(() => { done() })
  })

  it('Fails when request returns an error', function(done){
    defaultHandler({ responseUrl: 'https://blog.iamnguele.com' }, undefined, failedRequest)
        .then(() => { assert(false, 'should not succeed') })
        .catch(() => { done() })
  })
})