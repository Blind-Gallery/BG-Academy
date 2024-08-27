const log = require('pino')()

const FormData = require('form-data')
const axios = require('axios').default
require('dotenv').config()
class IPFS {
  getHeaders () {
    const auth = Buffer.from(process.env.INFURA_PROJECT_ID + ':' +
      process.env.INFURA_API_KEY).toString('base64')
    return {
      Authorization: `Basic ${auth}`
    }
  }

  async add (buffer, fileName) {
    const form = new FormData()
    form.append('file', buffer, fileName)
    const auth = this.getHeaders()

    try {
      const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', form, {
        headers: {
          ...auth,
          ...form.getHeaders()
        }
      })

      log.info(`File uploaded! - File hash: ${response.data.Hash}`)
      return response.data.Hash
    } catch (error) {
      log.error(`Error uploading file: ${fileName}, error: ${JSON.stringify(error)}`)
    }
  }
}

module.exports = IPFS
