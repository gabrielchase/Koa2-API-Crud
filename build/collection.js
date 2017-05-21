'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redis = require('promise-redis')();
var db = redis.createClient();

var Collection = function () {
    function Collection() {
        _classCallCheck(this, Collection);
    }

    _createClass(Collection, [{
        key: 'count',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var count;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return db.zcount(this.name, '-inf', '+inf');

                            case 2:
                                count = _context.sent;
                                return _context.abrupt('return', Number(count));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function count() {
                return _ref.apply(this, arguments);
            }

            return count;
        }()
    }, {
        key: 'add',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return db.zadd(this.name, 1, JSON.stringify(event));

                            case 2:
                                _context2.next = 4;
                                return this._incrGroup(event);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function add(_x) {
                return _ref2.apply(this, arguments);
            }

            return add;
        }()
    }, {
        key: '_incrGroup',
        value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event) {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, attr;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context3.prev = 3;
                                _iterator = this.groupBy[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context3.next = 12;
                                    break;
                                }

                                attr = _step.value;
                                _context3.next = 9;
                                return db.hincrby(this.name + '_by_' + attr, event[attr], 1);

                            case 9:
                                _iteratorNormalCompletion = true;
                                _context3.next = 5;
                                break;

                            case 12:
                                _context3.next = 18;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](3);
                                _didIteratorError = true;
                                _iteratorError = _context3.t0;

                            case 18:
                                _context3.prev = 18;
                                _context3.prev = 19;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 21:
                                _context3.prev = 21;

                                if (!_didIteratorError) {
                                    _context3.next = 24;
                                    break;
                                }

                                throw _iteratorError;

                            case 24:
                                return _context3.finish(21);

                            case 25:
                                return _context3.finish(18);

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));

            function _incrGroup(_x2) {
                return _ref3.apply(this, arguments);
            }

            return _incrGroup;
        }()
    }]);

    return Collection;
}();

exports.default = Collection;