/*
Arrange
*/

// Tested component
var pastebinHandler = require('../../response-handlers/pastebin')

// Variables
var pastebinKey = 'testKey'
var pastebinDomain = 'https://pastebin.com'
var pastebinExpectedPath = '/raw/' + pastebinKey
var pastebinExpectedResponse = 'pastebinExpectedResponse'

var contentTypeHeader = 'Content-Type'
var contentTypePlainText = 'text/plain; charset=utf-8'

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
    var sendStub = sinon.spy()
    var res = {
        send: (body) => { 
            sendStub(body)
            done()
        },
        type: sinon.spy()
    }

    pastebinHandler({ pastebinId: 'someId' }, res, undefined, successfulRequest)

    assert(sendStub.calledWith(pastebinExpectedResponse) === true, 'response not sent')
    assert(res.type.calledOnce === true, 'content-type not set')
  })

  it('Does not make pastebin request but calls failure when pastebinId is not defined', function(done){
    var failStub = sinon.spy()

    pastebinHandler({}, undefined, () => {
            failStub()
            done()
        }, undefined)

    assert(failStub.calledOnce === true, 'not failing as expected')
  })

  it('Fails when pastebin query returns an error', function(done){
    var failStub = sinon.spy()

    pastebinHandler({ pastebinId: 'someId' }, undefined, 
        () => {
            failStub()
            done()
        },
        failedRequest)

    assert(failStub.calledOnce === false, 'not failing as expected')
  })
})