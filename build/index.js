'use strict';

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require("koa-bodyparser");

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _routes = require("./middleware/routes");

var _postgres = require("./postgres");

var _todos = require("./models/todos");

var _config = require("./config/config");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core").transform("code", options);

var options = {
    key: _fs2.default.readFileSync('./src/keys/server.key'),
    cert: _fs2.default.readFileSync('./src/keys/server.crt')
};

var app = new _koa2.default();

app.use((0, _koaLogger2.default)());
app.use((0, _koaBodyparser2.default)());
app.use((0, _postgres.postgresMiddleware)(_config.config.dbUri, _todos.schema));
app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.body = 'Hello world';

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

console.log(options.key);
console.log(options.cert);

app.listen(_config.config.server.port, function () {
    return console.log("Server listening on port: " + _config.config.server.port);
});