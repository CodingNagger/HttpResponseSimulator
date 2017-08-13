function generateResponse(processed, res) {
    var message = ''

    if (processed.wait !== undefined) {
        message += 'Waited '+processed.wait+'ms to respond.\
        '
    }

    res.type('text/plain')
    res.send(message)
}

module.exports = generateResponse