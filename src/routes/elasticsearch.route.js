const Router = require('koa-router')
const ElasticsearchController = require('../controllers/elasticsearch.controller')

const controllers = new ElasticsearchController()
const elasticsearch = new Router()
elasticsearch.post('/elasticsearch', controllers.exec)

module.exports = elasticsearch