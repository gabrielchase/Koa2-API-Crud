'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTables = exports.SQL = undefined;

var createTables = exports.createTables = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(pgInstance, schemas) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return pgInstance.transaction(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(instance) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.prev = 0;
                                                _context.next = 3;
                                                return instance.query(schemas.create[0]);

                                            case 3:
                                                _context.next = 8;
                                                break;

                                            case 5:
                                                _context.prev = 5;
                                                _context.t0 = _context['catch'](0);

                                                console.log('Error creating tables: ', err);

                                            case 8:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this, [[0, 5]]);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function createTables(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _pgAsync = require('pg-async');

Object.defineProperty(exports, 'SQL', {
    enumerable: true,
    get: function get() {
        return _pgAsync.SQL;
    }
});
exports.postgresMiddleware = postgresMiddleware;

var _pgAsync2 = _interopRequireDefault(_pgAsync);

var _once = require('once');

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function postgresMiddleware(uri, schemas) {
    var _this2 = this;

    var pgInstance = new _pgAsync2.default(uri);
    var setup = (0, _once2.default)(createTables);

    return function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return createTables(pgInstance, schemas);

                        case 2:
                            _context3.next = 4;
                            return next();

                        case 4:
                            return _context3.abrupt('return', _context3.sent);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));

        return function (_x4, _x5) {
            return _ref3.apply(this, arguments);
        };
    }();
}