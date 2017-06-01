'use strict'

import Router from 'koa-router'

import todoCrudOps from '../models/todos'

const router = new Router()

router.get('/todos', checkSecure(), async (ctx, next) => {
    let { rows } = await todoCrudOps.read()
    ctx.status = 200
    ctx.body = rows
})

router.get('/todos/:id', checkSecure(), async (ctx, next) => {
    let { rows } = await todoCrudOps.readOne(ctx.params.id)
    ctx.status = 200
    ctx.body = rows
})

router.post('/todos', checkSecure(), async (ctx, next) => {
    const body = await todoCrudOps.create(ctx.request.body)
    ctx.status = 201
    ctx.body = body
})

router.put('/todos/:id', checkSecure(), async(ctx, next) => {
    const body = await todoCrudOps.update(ctx.params.id, ctx.request.body)
    ctx.status = 202
    ctx.body = body
})

router.delete('/todos/:id', checkSecure(), async(ctx, next) => {
    await todoCrudOps.delete(ctx.params.id)
    ctx.status = 204
})

router.get('/server-push', checkSecure(), async(ctx, next) => {
    ctx.status = 200
    ctx.res.push('/server-push-file.js', {
        request: {
            accept: '*/\*'
        },
        response: {
            'content-type': 'application/json',
        }
    }).end('alert("Hello from server push before render")')
    
    ctx.res.end(`
        <p> Render after alert </p>
        <script src="/server-push-file.js"></script>
    `)
})

export function routes() { return router.routes() }

export function allowedMethods() { return router.allowedMethods() }

function checkSecure() {
    return async(ctx, next) => {
        if (ctx.secure != true) {
            console.log('Secure: ', ctx.secure)
            ctx.redirect('https://locahost:3000/todos')
        }
        console.log('Secure: ',  ctx.secure)
        await next()
    }
}