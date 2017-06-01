'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var assert = _chai2.default.assert;
var should = _chai2.default.should();

describe('Utils', function () {
    it('stringGen gives a random string of hardcoded given size', function (done) {
        var newString1 = (0, _utils.stringGen)(10);
        var newString2 = (0, _utils.stringGen)(10);
        var newString3 = (0, _utils.stringGen)(10);
        assert.notEqual(newString1, newString2);
        assert.notEqual(newString1, newString3);
        assert.notEqual(newString2, newString3);
        done();
    });
    it('getRandomInt gives a number between or equal to the min and max given', function (done) {
        var min = 1;
        var max = 100;
        for (var i = min; i <= max; i++) {
            var num = (0, _utils.getRandomInt)(min, max);
            expect(num).gte(min);
            expect(num).lte(max);
        }
        done();
    });
});