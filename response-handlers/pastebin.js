var Promise = require('promise')

function generateResponse(processed, res, request) {
    return new Promise((fulfill, reject) => {
        if (processed.pastebinId !== undefined) {
            var r = request.get('https://pastebin.com/raw/'+processed.pastebinId, function (err, innerRes, body) {
                if (err) {
                    reject('request failed')
                }
                else {
                    if (processed.accept == undefined) {
                        res.type('text/plain')
                    }
                    else {
                        res.type(processed.accept)
                    }
                    res.send(body)
                    fulfill()
                }
            })
        }
        else {
            reject('no pastebinId')
        }
    })
}

module.exports = generateResponse