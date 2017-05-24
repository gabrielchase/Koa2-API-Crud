"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var should = _chai2.default.should();

describe("Test the behavior of addTwo()", function () {
    it('should return 2 when given 1 and 1 via expect()', function () {
        expect((0, _app.addTwo)(1, 1)).to.be.equal(2);
    });
    it('should not return 3 when given 1 and 1 via should()', function () {
        (0, _app.addTwo)(1, 1).should.not.be.equal(3);
    });
});