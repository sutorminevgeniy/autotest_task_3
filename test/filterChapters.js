const chai = require('chai');
const chaiQuantifiers = require('chai-quantifiers');

const sendRequest = require('../lib/sendRequest');
const filterChapters = require('../data/filterChapters');
const env = require('../endpoint/test');

const expect = chai.expect;
chai.use(chaiQuantifiers);

describe.skip('Filter of Chapters', () => {

    filterChapters.map((data) => {
        let response, statusCode, statusMessage, headers, body;

        before(async () => {
            data.uri = env.uri + data.uri;

            response = await sendRequest(data);
            body = response.body;
        });

        it('Verifying Chapters result', () => {
            expect(body.results).to.be.an('array');
        });

        it('Verifying property "name" of Chapters result', () => {
            expect(body.results).to.containAll(
                item => item.name.toLowerCase().indexOf('rick'.toLowerCase()) != -1 );
        });

        it('Verifying property "status" of Chapters result', () => {
            expect(body.results).to.containAll(item => item.status == 'Alive');
        });

    })

});