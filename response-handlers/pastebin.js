function generateResponse(processed, res, failure) {

    if (processed.pastebinId !== undefined) {
        var request = require('request')
        var r = request.get('https://pastebin.com/raw/'+processed.pastebinId, function (err, innerRes, body) {
            if (err) {
                failure()
            }
            else {
                if (processed.accept == undefined) {
                    res.type('text/plain')
                }
                else {
                    res.type(processed.accept)
                }
                res.send(body)
            }
        })
    }
    else {
        failure()
    }
}

module.exports = generateResponse