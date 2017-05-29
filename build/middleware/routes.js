'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = routes;
exports.allowedMethods = allowedMethods;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _todos = require('../models/todos');

var _todos2 = _interopRequireDefault(_todos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = new _koaRouter2.default();
var todoRoute = new _koaRouter2.default();

todoRoute.get('/', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _todos2.default.read();

                    case 2:
                        _ref2 = _context.sent;
                        rows = _ref2.rows;

                        ctx.status = 200;
                        ctx.body = rows;

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

todoRoute.get('/:id', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var _ref4, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _todos2.default.readOne(ctx.params.id);

                    case 2:
                        _ref4 = _context2.sent;
                        rows = _ref4.rows;

                        ctx.status = 200;
                        ctx.body = rows;

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}());

todoRoute.post('/', function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _todos2.default.create(ctx.request.body);

                    case 2:
                        ctx.status = 201;

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}());

todoRoute.put('/:id', function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _todos2.default.update(ctx.params.id, ctx.request.body);

                    case 2:
                        ctx.status = 204;

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
    };
}());

todoRoute.delete('/:id', function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(ctx, next) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _todos2.default.delete(ctx.params.id);

                    case 2:
                        ctx.status = 204;

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
    };
}());

router.use('/todos', todoRoute.routes(), todoRoute.allowedMethods());

function routes() {
    return router.routes();
}
function allowedMethods() {
    return router.allowedMethods();
}