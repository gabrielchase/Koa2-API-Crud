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

router.get('/todos', checkSecure(), async function (ctx, next) {
    var _ref = await _todos2.default.read();

    var rows = _ref.rows;

    ctx.status = 200;
    ctx.body = rows;
});

router.get('/todos/:id', checkSecure(), async function (ctx, next) {
    var _ref2 = await _todos2.default.readOne(ctx.params.id);

    var rows = _ref2.rows;

    ctx.status = 200;
    ctx.body = rows;
});

router.post('/todos', checkSecure(), async function (ctx, next) {
    await _todos2.default.create(ctx.request.body);
    ctx.status = 201;
});

router.put('/todos/:id', checkSecure(), async function (ctx, next) {
    await _todos2.default.update(ctx.params.id, ctx.request.body);
    ctx.status = 204;
});

router.delete('/todos/:id', checkSecure(), async function (ctx, next) {
    await _todos2.default.delete(ctx.params.id);
    ctx.status = 204;
});

router.get('/server-push', checkSecure(), async function (ctx, next) {
    ctx.status = 200;
    ctx.res.push('/server-push-file.js', {
        request: {
            accept: '*/\*'
        },
        response: {
            'content-type': 'application/json'
        }
    }).end('alert("Hello from server push before render")');

    ctx.res.end('\n        <p> Render after alert </p>\n        <script src="/server-push-file.js"></script>\n    ');
});

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