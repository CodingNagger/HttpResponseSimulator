var sleep = require('system-sleep')

function processQuery(query) {
    var response = ''

    var wait = parseInt(query.wait)

    if (!isNaN(wait)) {
        sleep(wait)
        response += 'Waited '+wait+'ms to respond.\
        '
    }

    return response
}

module.exports = processQuery