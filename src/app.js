'use strict'

import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'

import todos from './routes/todos'

const app = new Koa()
const router = new Router()

app.use(bodyparser())

router.use('/todos', todos.routes(), todos.allowedMethods())
app.use(router.routes())

// visible and usable to ../index.js
export default app