'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = (0, _koaRouter2.default)();

var validateCollection = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var collection;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        collection = ctx.params.collection;

                        if (!(!collection in ctx.state.collections)) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', ctx.throw(404));

                    case 3:
                        _context.next = 5;
                        return next();

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function validateCollection(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var validateKey = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var authorization;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log(ctx);
                        authorization = ctx.request.header.authorization;

                        if (!(authorization !== ctx.state.authorizationHeader)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt('return', ctx.throw(401));

                    case 4:
                        _context2.next = 6;
                        return next();

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function validateKey(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

api.post('/:collection', validateKey, validateCollection, function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var collection, count;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        collection = ctx.params.collection;
                        _context3.next = 3;
                        return ctx.state.collections[collection].add(request.body);

                    case 3:
                        count = _context3.sent;


                        ctx.status = 201;

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = api;