const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const yenv = require('yenv')
const env = yenv()

const server = new koa()


server.use(bodyParser())
server.use(require('koa-static')(path.resolve(__dirname, '../public')))

server.listen(env.PORT, () => {
    console.log(`server is running in port ${env.PORT}`)
})