const ElasticManager = require('../utils/elasticsearchManager')
const Dummy = require('../utils/filters')
const elasticManager = new ElasticManager()
const { size } = require('lodash')
const personalizations = ['GND', 'LAN', 'ODD', 'OPT', 'OPM', 'PAD', 'SR', 'LIQ', 'CAT', 'HV', 'LMG', 'REV']

module.exports = class {
    async search({ fields, orders, options }) {
        const multi_match = this.buildQueryFields(fields, options)
        let sort = this.buildQueryOrders(orders)
        sort = sort.length === 0 ? undefined : sort
        const dummy = new Dummy(options)
        const consultingDummy = dummy.getConsultantDummyQuery(personalizations)
        let filter = []
        if (size(consultingDummy) > 0) filter.push({ bool: { should: consultingDummy } })
        const query = {
            size: options.size,
            sort,
            query: {
                bool: {
                    must: multi_match,
                    filter
                }
            }
        }
        
        const data = await elasticManager.search(options.country, options.campaign, query)
        return {
            ...data,
            query: JSON.stringify(query)
        }
    }

    buildQueryOrders(orders) {
        let order = []
        const alta = orders.find(x => x.importance === 'alta')
        if (alta && Object.keys(alta).length > 0) {
            order.push({
                [alta.order]: alta.type
            })
        }
        const media = orders.find(x => x.importance === 'media')
        if (media && Object.keys(media).length > 0) {
            order.push({
                [media.order]: media.type
            })
        }
        const baja = orders.find(x => x.importance === 'baja')
        if (baja && Object.keys(baja).length > 0) {
            order.push({
                [baja.order]: baja.type
            })
        }
        return order
    }

    buildQueryFields(fields_array, { txtSearch, type, operator }) {
        const array = []
        for (let i = 0; i < fields_array.length; i++) {
            const item = fields_array[i]
            const field = item.field
            let field_string = field
            if (item.analyzers) {
                for (let j = 0; j < item.analyzers.length; j++) {
                    const element = item.analyzers[j]
                    const analyzer = element.analyzer
                    const importance = element.importance
                    field_string += analyzer === '' ? '' : `.${analyzer}`
                    field_string += importance === 0 ? '' : `^${importance}`
                    array.push(field_string)
                    field_string = field
                }
            } else {
                array.push(field_string)
            }
        }
        return [
            {
                multi_match: {
                    query: txtSearch,
                    type,
                    operator,
                    fields: array
                }
            }
        ]
    }
}