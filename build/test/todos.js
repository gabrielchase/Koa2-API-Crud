'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _utils = require('../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var assert = _chai2.default.assert;
var should = _chai2.default.should();

var server = 'http://localhost:3000';

_chai2.default.use(_chaiHttp2.default);

describe('Todos', function () {
    var dbLength = void 0;

    (0, _nodeFetch2.default)(server + '/todos').then(function (response) {
        return response.json();
    }).then(function (data) {
        dbLength = data.length;
    }).catch(function (err) {
        new Error(err);
    });

    it('should list ALL todos on /todos GET', function (done) {
        _chai2.default.request(server).get('/todos').end(function (err, res) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = res.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var todo = _step.value;

                    todo.should.have.property('id');
                    todo.should.have.property('title');
                    todo.should.have.property('completed');
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
    it('should ADD SINGLE todos on /todos POST', function (done) {
        _chai2.default.request(server).post('/todos').send({ title: 'Title test', completed: false }).end(function (err, res) {
            res.should.have.status(201);
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            res.body.should.have.property('completed');
            done();
        });
    });
    it('should list ONE todos on /todos GET', function (done) {
        var id = (0, _utils.getRandomInt)(1, dbLength);
        _chai2.default.request(server).get('/todos/' + id).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.have.length(1);
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('completed');
            done();
        });
    });
    it('should EDIT SINGLE todos on /todos PUT', function (done) {
        var oldTodo = void 0;
        var newTodo = void 0;
        var id = (0, _utils.getRandomInt)(1, dbLength);

        _chai2.default.request(server).get('/todos/' + id).end(function (err, res) {
            oldTodo = Object.assign({}, res.body[0]);
        });

        var newTitle = (0, _utils.stringGen)(10);
        var newCompleted = (0, _utils.getRandomInt)(0, 1) === 0 ? false : true;

        _chai2.default.request(server).put('/todos/' + id).send({ title: newTitle, completed: newCompleted }).end(function (err, res) {
            res.should.have.status(202);
            newTodo = Object.assign({}, res.body);
            assert.equal(newTodo.id, oldTodo.id);
            assert.notEqual(newTodo, oldTodo);
            done();
        });
    });
});