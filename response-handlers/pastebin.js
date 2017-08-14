var Promise = require('promise')

function generateResponse(processed, res, request) {
    return new Promise((resolve, reject) => {
        if (processed.pastebinId !== undefined) {
            var r = request.get('https://pastebin.com/raw/'+processed.pastebinId, function (err, innerRes, body) {
                if (err) {
                    reject()
                }
                else {
                    if (processed.accept == undefined) {
                        res.type('text/plain')
                    }
                    else {
                        res.type(processed.accept)
                    }
                    res.send(body)
                    resolve()
                }
            })
        }
        else {
            reject()
        }
    })
}

module.exports = generateResponse