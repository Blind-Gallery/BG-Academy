const log = require('pino')()

require('dotenv').config()

class BaseIpfs {
  async init () {
    try {
      const { hostname, port } = new URL(process.env.IPFS_URL)
      const auth = 'Basic ' + Buffer.from(process.env.INFURA_PROJECT_ID + ':' +
        process.env.INFURA_API_KEY).toString('base64')
      const kuboRpcClientImport = await import('kubo-rpc-client').then(module => { })
      this.ipfsClientInstance = kuboRpcClientImport.create({
        host: hostname,
        port,
        protocol: 'https',
        headers: {
          authorization: auth
        }
      })
    } catch (error) {
      log.error(error.message)
    }
  }

  async add (data) {

  }
}

module.exports = BaseIpfs
