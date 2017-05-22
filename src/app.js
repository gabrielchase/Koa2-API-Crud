'use strict'

import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'

import todos from './routes/todos'

import { postgresMiddleware } from './postgres'
import { schema as todosSchema } from './models/todos'

var dbConfig = {
    uri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud?user=gchasepatron&password=postgrespassword'
}

const app = new Koa()
const router = new Router()

app.use(bodyparser())
app.use(postgresMiddleware(dbConfig.uri, todosSchema))

router.use('/todos', todos.routes(), todos.allowedMethods())

app.use(router.routes())

// visible and usable to ../index.js
export default app