'use strict'

import Koa from 'koa'
import api from './api'
// import config from './config'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'

const app = new Koa()

app.use(async (ctx) => {
    ctx.body = 'Hello Koa2!'
})

// visible and usable to ../index.js
export default app