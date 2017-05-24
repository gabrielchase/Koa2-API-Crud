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

var router = new _koaRouter2.default();
var todoRoute = new _koaRouter2.default();

todoRoute.get('/', async function (ctx, next) {
    var result = await _todos2.default.read();
    ctx.status = 200;
    ctx.body = result.rows;
});

todoRoute.get('/:id', async function (ctx, next) {
    await _todos2.default.readOne(ctx.params.id);
    ctx.status = 200;
});

todoRoute.post('/', async function (ctx, next) {
    await _todos2.default.create(ctx.request.body);
    ctx.status = 201;
});

todoRoute.put('/:id', async function (ctx, next) {
    await _todos2.default.update(ctx.params.id, ctx.request.body);
    ctx.status = 204;
});

todoRoute.delete('/:id', async function (ctx, next) {
    await _todos2.default.delete(ctx.params.id);
    ctx.status = 204;
});

router.use('/todo', todoRoute.routes(), todoRoute.allowedMethods());

function routes() {
    return router.routes();
}
function allowedMethods() {
    return router.allowedMethods();
}