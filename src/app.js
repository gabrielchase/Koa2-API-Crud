'use strict'

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'

import { routes, allowedMethods } from './middleware/routes'
import { postgresMiddleware } from './postgres'
import { schema as todosSchema } from './models/todos'

// import err from './middleware/error'

var dbConfig = {
    uri: process.env.DATABASE_URL || 'postgres://localhost:5432/koacrud?user=gchasepatron&password=postgrespassword'
}

const app = new Koa()

app.use(bodyparser())
app.use(postgresMiddleware(dbConfig.uri, todosSchema))
app.use(routes())

// visible and usable to ../index.js
export default app