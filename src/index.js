'use strict'

require("babel-core").transform("code", options);

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import fs from 'fs'
import http2 from 'spdy'

import { routes, allowedMethods } from './middleware/routes'
import { postgresMiddleware } from './postgres'
import { schema as todosSchema } from './models/todos'
import { config } from './config/config'

const options = {
    key: fs.readFileSync('./src/keys/server.key'),
    cert: fs.readFileSync('./src/keys/server.crt')
}

const app = new Koa()

app.use(logger())
app.use(bodyparser())
app.use(postgresMiddleware(config.dbUri, todosSchema))
app.use(routes())

console.log(options.key)
console.log(options.cert)

app.listen(config.server.port, () => console.log(`Server listening on port: ${config.server.port}`))