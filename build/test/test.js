'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var should = _chai2.default.should();

var server = 'http://localhost:3000';

_chai2.default.use(_chaiHttp2.default);

describe('Todos', function () {
    it('should list ALL todos on /todos GET', function (done) {
        _chai2.default.request(server).get('/todos').end(function (err, res) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = res.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var todo = _step.value;

                    todo.should.have.property('id');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            res.should.have.status(200);
            done();
        });
    });
    it('should list ONE todos on /todos GET', function (done) {
        _chai2.default.request(server).get('/todos/1').end(function (err, res) {
            res.body.should.have.length(1);
            res.body[0].should.have.property('id');
            res.should.have.status(200);
            done();
        });
    });
    it('should ADD SINGLE todos on /todos POST', function (done) {
        _chai2.default.request(server).post('/todos').send({ title: 'Title test', completed: false }).end(function (err, res) {
            res.should.have.status(201);
            done();
        });
    });
    it('should EDIT SINGLE todos on /todos PUT', function (done) {
        _chai2.default.request(server).put('/todos/1').send({ title: 'Edit title', completed: true }).end(function (err, res) {
            res.should.have.status(204);
            done();
        });
    });
});