'use strict'

import Koa from 'koa'
import Router from 'koa-router'

const router = new Router()
const todos = []

router.get('/', async ctx => {
    ctx.body = todos
})

router.post('/', async (ctx) => {
    const { title } = ctx.request.body
    todos.push({ title, completed: false})
    ctx.status = 201
})

export default router