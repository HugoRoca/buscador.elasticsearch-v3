const elastic = require('elasticsearch')
const yenv = require('yenv')
const env = yenv()

module.exports = class {
  getIndexName(country, campaign) {
    return `${env.ELASTICSEARCH.INDEX_NAME}_${country.toLowerCase()}_${campaign}_*`
  }

  getCluster(country) {
    return env.ELASTICSEARCH.CLUSTERS.find(item => {
      return item.COUNTRIES.some(x => {
        return x.toUpperCase() === country.toUpperCase()
      })
    })
  }

  getClient(country) {
    const host = this.getCluster(country).ENDPOINT
    return new elastic.Client({
      host,
      requestTimeout: 30000
    })
  }

  async search(country, campaign, data) {
    const index = this.getIndexName(country, campaign)
    return await this.getClient(country).search({
      index,
      type: '_doc',
      body: data
    })
  }
}
