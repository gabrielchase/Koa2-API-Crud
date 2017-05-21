'use strict'

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'
const src = env === 'production' ? './build/app' : './src/app'

require('babel-polyfill')
if (env === 'development') {
    // faster runtime compilation in dev environment
    require('babel-register')
}

// Uses export defaulted app in ./src/app
const app = require(src).default

app.listen(port, () => console.log(`Server listening on port: ${port}`))