'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async function (ctx, next) {
    try {
        await next();
    } catch (error) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};