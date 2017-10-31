var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune cookies tests', function () {

    test('getFortune() should return a fortune', function () {
        expect(typeof fortune.getFortune() === 'string');
    });

    test('getForune() should return string at least 3 words', function () {
        expect(fortune.getFortune().split('s+').length >= 3);
    });
});