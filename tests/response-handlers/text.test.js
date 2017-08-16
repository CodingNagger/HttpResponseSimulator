// Tested component
var textHandler = require('../../response-handlers/text')

// Dependencies
var assert = require('assert')
var sinon = require('sinon')

// Tests
describe('text.test.js - generateResponse', function(){
  it('Returns correct text for wait', function(done){
    var res = {
        send: sinon.spy()
    }

    var query = { wait: 300 }
    var expectedText = 'Waited '+query.wait+'ms to respond.\
                '
    textHandler(query, res)
        .then((processed) => {
            assert(res.send.calledWith(expectedText), 'invalid response not sent')
            done()
        })
  })
})