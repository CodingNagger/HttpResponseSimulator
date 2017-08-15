function generateResponse(processed, res, request) {
    return new Promise((resolve, reject) => {
            var message = ''

            if (processed.wait !== undefined) {
                message += 'Waited '+processed.wait+'ms to respond.\
                '
            }

            res.type('text/plain')
            res.send(message)

            resolve(processed)
        })
}

module.exports = generateResponse