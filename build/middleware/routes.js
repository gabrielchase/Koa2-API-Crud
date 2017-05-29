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

router.get('/', checkSecure(), async function (ctx, next) {
    var _ref = await _todos2.default.read();

    var rows = _ref.rows;

    ctx.status = 200;
    ctx.body = rows;
});

router.get('/:id', checkSecure(), async function (ctx, next) {
    var _ref2 = await _todos2.default.readOne(ctx.params.id);

    var rows = _ref2.rows;

    ctx.status = 200;
    ctx.body = rows;
});

router.post('', checkSecure(), async function (ctx, next) {
    await _todos2.default.create(ctx.request.body);
    ctx.status = 201;
});

router.put('/:id', checkSecure(), async function (ctx, next) {
    await _todos2.default.update(ctx.params.id, ctx.request.body);
    ctx.status = 204;
});

router.delete('/:id', checkSecure(), async function (ctx, next) {
    await _todos2.default.delete(ctx.params.id);
    ctx.status = 204;
});

router.use('/todos', router.routes(), router.allowedMethods());

function routes() {
    return router.routes();
}

function allowedMethods() {
    return router.allowedMethods();
}

function checkSecure() {
    return async function (ctx, next) {
        if (ctx.secure != true) {
            console.log('not secure');
            ctx.body = 'not secure';
            ctx.redirect('https://locahost:3000/todos');
        }
        console.log('secure: ', ctx.secure);
        await next();
    };
}