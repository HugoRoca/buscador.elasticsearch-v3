const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const PORT = env.PORT || 3000

const server = new koa()

server.use(bodyParser())
server.use(serve(__dirname + '/public'))

server.listen(3000, () => {
    console.log(`server is running in port ${PORT}`)
})