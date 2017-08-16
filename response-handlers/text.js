function generateResponse(processed, res) {
    return new Promise((resolve, reject) => {
            var message = ''

            if (processed.wait !== undefined) {
                message += 'Waited '+processed.wait+'ms to respond.\
                '
            }

            res.send(message)

            resolve(processed)
        })
}

module.exports = generateResponse