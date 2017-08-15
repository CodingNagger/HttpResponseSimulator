var Promise = require('promise')
var urlGenerateResponse = require('./url')

function generateResponse(processed, res, request) {
    return new Promise((fulfill, reject) => {
        if (processed.pastebinId !== undefined) {
            processed.responseUrl = 'https://pastebin.com/raw/'+processed.pastebinId

            urlGenerateResponse(processed, res, request)
                .then(fulfill)
                .catch(reject)
        }
        else {
            reject('no pastebinId')
        }
    })
}

module.exports = generateResponse