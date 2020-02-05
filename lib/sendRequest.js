const request = require('request-promise-native');

function sendRestRequestWithHeader(opts) {
    let options = {
        uri: opts.uri,
        method: opts.method,
        headers: opts.header,
        qs: opts.qs,
        resolveWithFullResponse: true, // выводить полный запрос (по умолчанию body)
        simple: false, // Получите отказ, только если запрос не прошел по техническим причинам
        json: true
    };

    return request(options).then((response) => {
        return response;
    });

};

module.exports = sendRestRequestWithHeader;