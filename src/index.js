'use strict'

require("babel-core").transform("code");

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import Router from 'koa-router'
import fs from 'fs'
import http2 from 'spdy'

import { routes, checkSecure } from './middleware/routes'
import { postgresMiddleware } from './postgres'
import { schema as todosSchema } from './models/todos'
import { setDb } from './utils/utils'

const port = process.env.PORT || 3000
const { dbUri } = setDb(process.env.NODE_ENV)

console.log('dbUri: ', dbUri)

const certs = {
    key: fs.readFileSync('./src/keys/server.key'),
    cert: fs.readFileSync('./src/keys/server.crt')
}

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(bodyparser())
app.use(postgresMiddleware(dbUri, todosSchema))
app.use(routes())

// http2.createServer(certs, app.callback()).listen(config.server.port, () => 
//     console.log(`Server listening on port: ${config.server.port}`))

app.listen(port, () => 
    console.log(`Server listening on port: ${port}`))
    
