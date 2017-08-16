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

        var res = {
            send: sinon.spy(),
            type: sinon.spy()
        }

        main.handle(query, res, handler)
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

    it('Write data, status code and content-type to response', function(done){
        var query = { statusCode: 999, accept: 'jd/iamnguele' }
        var res = {
            send: sinon.spy(),
            status: sinon.spy(),
            type: sinon.spy()
        }
        
        var testResponse = 'testResponse'
        
        main.handle(query, res, (processed, ress) => {
            return new Promise((resolve, reject) => {
                ress.send(testResponse)
                resolve()
            })
        })
        .then((stuff) => {
          assert(res.send.calledWith(testResponse)) 
          assert(res.type.calledWith(query.accept)) 
          assert(res.status.calledWith(query.statusCode))  
          done()
        })
    })
})