'use strict'

import Router from 'koa-router'

import todoCrudOps from '../models/todos'

const router = new Router()
const todoRoute = new Router()

const todos = []

todoRoute.get('/', async (ctx, next) => {
    let result = await todoCrudOps.getAll()
    ctx.status = 200
    ctx.body = result.rows
})

todoRoute.post('/', async (ctx, next) => {
    console.log('body: ', ctx.request.body)
    await todoCrudOps.create(ctx.request.body)
    ctx.status = 201
})

router.use('/todo', todoRoute.routes(), todoRoute.allowedMethods())

export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }