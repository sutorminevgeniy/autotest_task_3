const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getChapter = require('../data/getChapter');
const getChapterNegative = require('../data/getChapterNegative');
const env = require('../endpoint/test');
const fs = require('fs');

describe('Get Chapter by id', () => {

    getChapter.map((data) => {
        let response, statusCode, statusMessage, headers, body;
        // let {statusCode, statusMessage, headers, body} = response;
        let id = parseInt(data.uri.split('/')[2]);

        describe(`Chapter with id ${id}`, () => {
            before(async () => {
                data.uri = env.uri + data.uri;
                console.log(data.uri);

                response = await sendRequest(data);
                body = response.body;
                statusCode = response.statusCode;
            });

            it('Verifying status Code', () => {
                expect(statusCode).to.eql(200);
            });

            it('Verifying Chapter properties', () => {
                expect(body).to.have.all.keys(
                    "id",
                    "name",
                    "status",
                    "species",
                    "type",
                    "gender",
                    "origin",
                    "location",
                    "image",
                    "episode",
                    "url",
                    "created");
            });

            it('Verifying Chapter id', () => {
                expect(body.id).to.eql(id);
            });

            it('Verifying Chapter name', () => {
                expect(body.name).to.eql(data.result.name);
            });

            // it('Verifying Chapter email with id ' + id, () => {
            //     expect(body.email).to.match(/\w+@\w+.\w{1,5}/);
            // });
        });
    });

    getChapterNegative.map((data) => {
        let response, statusCode, statusMessage, headers, body;
        let id = parseInt(data.uri.split('/')[2]);

        describe(`Missing character with id ${id}`, () => {
            before(async () => {
                data.uri = env.uri + data.uri;
                console.log(data.uri);

                response = await sendRequest(data);
                body = response.body;
                statusCode = response.statusCode;
            });

            it('Verifying status Code', () => {
                expect(statusCode).to.eql(404);
            });

            it('Verifying Chapter properties', () => {
                expect(body).to.have.all.keys(
                    "error");
            });

            it('Verifying Chapter error', () => {
                expect(body.error).to.eql(data.result.error);
            });
        });
    });
});