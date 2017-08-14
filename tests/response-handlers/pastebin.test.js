/*
Arrange
*/

// Tested component
var pastebinHandler = require('../../response-handlers/pastebin')

// Variables
var pastebinExpectedResponse = 'pastebinExpectedResponse'

// Dependencies
var assert = require('assert')
var sinon = require('sinon')

// Mocked dependencies
var successfulRequest = {
    get: function (query, callback){
        callback(undefined, undefined, pastebinExpectedResponse)
    }
}

var failedRequest = {
    get: function (query, callback){
        callback({error: 'happened'}, undefined, undefined)
    }
}

/*
Act and assert
*/

describe('pastebin.test.js - generateResponse', function(){
  it('Succeeds when pastebinId is defined and requests returns body', function(done){
    var res = {
        send: sinon.spy(),
        type: sinon.spy()
    }

    pastebinHandler({ pastebinId: 'someId' }, res, successfulRequest)
        .then(() => {
            assert(res.send.calledWith(pastebinExpectedResponse), 'response not sent')
            assert(res.type.calledOnce, 'content-type not set')
            done()
        })
  })

  it('Does not make pastebin request but calls failure when pastebinId is not defined', function(done){
    pastebinHandler({}, undefined, undefined)
        .then(() => { assert(false, 'should not succeed') })
        .catch(() => { done() })
  })

  it('Fails when pastebin query returns an error', function(done){
    pastebinHandler({ pastebinId: 'someId' }, undefined, failedRequest)
        .then(() => { assert(false, 'should not succeed') })
        .catch(() => { done() })
  })
})