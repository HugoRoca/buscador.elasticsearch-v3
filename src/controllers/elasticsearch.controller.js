const Elasticservice = require('../services/elasticsearch.service')
const service = new Elasticservice()

module.exports = class {
    async exec(ctx) {
        const params = ctx.request.body.data
        ctx.body = await service.search(params)
    }
}