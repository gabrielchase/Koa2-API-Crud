'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addTwo = undefined;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _routes = require('./middleware/routes');

var _postgres = require('./postgres');

var _todos = require('./models/todos');

var _config = require('./config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import err from './middleware/error'

var addTwo = function addTwo(num1, num2) {
    return num1 + num2;
};
exports.addTwo = addTwo;


var app = new _koa2.default();

app.use((0, _koaLogger2.default)());
app.use((0, _koaBodyparser2.default)());
app.use((0, _postgres.postgresMiddleware)(_config.config.dbUri, _todos.schema));
app.use((0, _routes.routes)());

// visible and usable to ../index.js
exports.default = app;