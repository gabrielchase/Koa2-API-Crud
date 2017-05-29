'use strict'

import Router from 'koa-router'

import todoCrudOps from '../models/todos'

const router = new Router()

router.get('/', checkSecure(), async (ctx, next) => {
    let { rows } = await todoCrudOps.read()
    ctx.status = 200
    ctx.body = rows
})

router.get('/:id', checkSecure(), async (ctx, next) => {
    let { rows } = await todoCrudOps.readOne(ctx.params.id)
    ctx.status = 200
    ctx.body = rows
})

router.post('', checkSecure(), async (ctx, next) => {
    await todoCrudOps.create(ctx.request.body)
    ctx.status = 201
})

router.put('/:id', checkSecure(), async(ctx, next) => {
    await todoCrudOps.update(ctx.params.id, ctx.request.body)
    ctx.status = 204
})

router.delete('/:id', checkSecure(), async(ctx, next) => {
    await todoCrudOps.delete(ctx.params.id)
    ctx.status = 204
})

router.use('/todos', router.routes(), router.allowedMethods())

export function routes() { return router.routes() }

export function allowedMethods() { return router.allowedMethods() }

function checkSecure() {
    return async(ctx, next) => {
        if (ctx.secure != true) {
            console.log('not secure')
            ctx.body = 'not secure'
            ctx.redirect('https://locahost:3000/todos')
        }
        console.log('secure: ',  ctx.secure)
        await next()
    }
}