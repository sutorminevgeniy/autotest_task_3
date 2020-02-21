const chai = require('chai');

const sendRequest = require('../lib/sendRequest');
const paginateChapters = require('../data/paginateChapters');
const env = require('../endpoint/test');

const expect = chai.expect;

describe('Paginate of Chapters', () => {

    paginateChapters.map((data) => {
        let response, statusCode, statusMessage, headers, body;

        before(async () => {
            data.uri = env.uri + data.uri;

            response = await sendRequest(data);
            body = response.body;
        });

        it('Verifying Paginate of Chapters result', () => {
            expect(body.results).to.be.an('array');
        });        

        it('Verifying Paginate of Chapters count result', () => {
            expect(body.results).to.have.lengthOf(20);
        });

        it('Verifying Paginate of Chapters start result', () => {
            expect(body).to.nested.include({'results[0].id': 21});
        });

        it('Verifying Paginate of Chapters end result', () => {
            expect(body).to.nested.include({'results[19].id': 40});
        });

    })

});