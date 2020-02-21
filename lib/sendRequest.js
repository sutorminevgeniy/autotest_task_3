const request = require('request-promise-native');

const got = require('got');

async function sendRestRequestWithHeader(opts) {
    // let options = {
    //     uri: opts.uri,
    //     method: opts.method,
    //     headers: opts.header,
    //     qs: opts.qs,
    //     resolveWithFullResponse: true, // выводить полный запрос (по умолчанию body)
    //     simple: false, // Получите отказ, только если запрос не прошел по техническим причинам
    //     json: true
    // };

    return got.get( opts.uri, {
        responseType: 'json',
        searchParams: opts.qs
    });
};

module.exports = sendRestRequestWithHeader;