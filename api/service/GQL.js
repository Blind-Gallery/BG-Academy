const { GraphQLClient } = require('graphql-request')

class GQL {
  constructor ({ endpoint, secret }) {
    this.client = new GraphQLClient(endpoint, {
      headers: {
        'x-hasura-admin-secret': secret
      }
    })
  }

  async request (doc, vars) {
    return this.client.request(doc, vars)
  }
}

module.exports = GQL
