// Tested component
const main = require("../main")

// Dependencies
const sinon = require('sinon')
const assert = require('assert')

// Tests
describe('app.js - default - handle(query, res, defaultPromise)', function(){
  it('hits the default handler when the query is empty', function(done){
    var handler = (processed, res) => { done() }
    var query = {}

    main.handle(query, undefined, handler)
  })

  it('passes processed query data', function(done){
    var query = {
        pastebinId: 'pastebinId',
        wait: 20,
        echo: 'echo'
    }
    var res = {
        send: sinon.spy(),
        type: sinon.spy()
    }

    main.handle(query, res, undefined)
        .then((processed) => { 
            assert(processed.pastebinId === query.pastebinId)
            assert(processed.wait === query.wait)
            assert(processed.echo === query.echo)
            
            done() 
        })
  })
})