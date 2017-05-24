'use strict'

import Router from 'koa-router'

const router = new Router()
const todoRoute = new Router()

const todos = []

todoRoute.get('/', async ctx => {
    ctx.body = 'Hello Koa2'
})

router.use('/todo', todoRoute.routes(), todoRoute.allowedMethods())

export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }