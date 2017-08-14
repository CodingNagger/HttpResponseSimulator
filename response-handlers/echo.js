var Promise = require('promise')

function generateResponse(processed, res, request) {
    return new Promise((fulfill, reject) => {
        if (processed.echo !== undefined) {
            res.type('text/plain')
            res.send(processed.echo)
            fulfill(processed)
        }
        else {
            reject('no echo')
        }
    })
}

module.exports = generateResponse