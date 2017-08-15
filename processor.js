var sleep = require('system-sleep')

function processQuery(query) {
    // object that will help rendering the response later
    var processed = {};

    // time to wait before sending the response
    var wait = parseInt(query.wait)

    if (!isNaN(wait)) {
        sleep(wait)
        processed['wait'] = wait
    }

    // pastebin
    if (query.pastebinId !== undefined) {
        processed['pastebinId'] = query.pastebinId
    }

    // echo
    if (query.echo !== undefined) {
        processed['echo'] = query.echo
    }

    // responseUrl
    if (query.responseUrl !== undefined) {
        processed['responseUrl'] = decodeURI(query.responseUrl)
    }

    // status code
    var statusCode = parseInt(query.statusCode)

    if (!isNaN(statusCode)) {
        processed['statusCode'] = query.statusCode
    }

    return processed
}

module.exports = processQuery