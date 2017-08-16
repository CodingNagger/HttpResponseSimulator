var urlGenerateResponse = require('./url')
var textGenerateResponse = require('./text')

function generateResponse(processed, res, request) {
    return new Promise((resolve, reject) => {
            urlGenerateResponse(processed, res, request)
                .then((processed) => {
                    resolve(processed)
                })
                .catch(reject)
        })
        .catch(() => {
            return new Promise((resolve, reject) => {
                textGenerateResponse(processed, res)
                    .then((processed) => {
                        resolve(processed)
                    })
                    .catch(reject)
            })
        })
}

module.exports = generateResponse