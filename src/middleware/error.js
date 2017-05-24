'use strict'

export default async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.status = err.statusCode || err.status || 500
        ctx.body = {
            message: err.message
        }
    }
}