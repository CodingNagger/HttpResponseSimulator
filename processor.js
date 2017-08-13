var sleep = require('system-sleep')

function processQuery(query) {
    var processed = {};
    var wait = parseInt(query.wait)

    if (!isNaN(wait)) {
        sleep(wait)
        processed['wait'] = wait
    }

    return processed
}

module.exports = processQuery