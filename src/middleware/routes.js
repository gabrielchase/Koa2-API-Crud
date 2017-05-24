'use strict'

import Router from 'koa-router'

import todoCrudOps from '../models/todos'

const router = new Router()
const todoRoute = new Router()

const todos = []

todoRoute.get('/', async (ctx, next) => {
    let result = await todoCrudOps.read()
    ctx.status = 200
    ctx.body = result.rows
})

todoRoute.post('/', async (ctx, next) => {
    await todoCrudOps.create(ctx.request.body)
    ctx.status = 201
})

todoRoute.put('/:id', async(ctx, next) => {
    await todoCrudOps.update(ctx.params.id, ctx.request.body)
    ctx.status = 204
})

router.use('/todo', todoRoute.routes(), todoRoute.allowedMethods())

export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }