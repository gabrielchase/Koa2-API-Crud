'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('Todos', function () {
    it('should get all todos', function (done) {
        _chai2.default.request(_app.app).get('/todos').end(function (err, res) {
            console.log('err: ', err);
            console.log('res: ', res);
            res.should.have.status(200);
            done();
        });
    });
});