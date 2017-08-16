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
    if (query.pastebinId) {
        processed['pastebinId'] = query.pastebinId
    }

    // echo
    if (query.echo) {
        processed['echo'] = query.echo
    }

    // responseUrl
    if (query.responseUrl) {
        processed['responseUrl'] = decodeURI(query.responseUrl)
    }

    // status code
    var statusCode = parseInt(query.statusCode)

    if (!isNaN(statusCode)) {
        processed['statusCode'] = query.statusCode
    }

    // accept
    if (query.accept) {
        processed['accept'] = query.accept
    }

    return processed
}

module.exports = processQuery