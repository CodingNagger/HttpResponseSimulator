var Promise = require('promise')

function generateResponse(processed, res, request) {
    return new Promise((fulfill, reject) => {
        if (processed.responseUrl !== undefined) {
            request.get(processed.responseUrl, function (err, innerRes, body) {
                if (err) {
                    reject('request to '+ processed.responseUrl +' failed')
                }
                else {
                    if (processed.accept == undefined) {
                        res.type('text/plain')
                    }
                    else {
                        res.type(processed.accept)
                    }
                    res.send(body)
                    fulfill(processed)
                }
            })
        }
        else {
            reject('no responseUrl set')
        }
    })
}

module.exports = generateResponse