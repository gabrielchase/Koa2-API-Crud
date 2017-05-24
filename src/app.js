'use strict'

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

import { routes, allowedMethods } from './middleware/routes'
import { postgresMiddleware } from './postgres'
import { schema as todosSchema } from './models/todos'
import { config } from './config/config'

// import err from './middleware/error'

const app = new Koa()

app.use(logger())
app.use(bodyparser())
app.use(postgresMiddleware(config.dbUri, todosSchema))
app.use(routes())

// visible and usable to ../index.js
export default app