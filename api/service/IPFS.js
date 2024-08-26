const { create } = require('kubo-rpc-client')
const mime = require('mime-types')
require('dotenv').config()

class BaseIpfs {
  constructor () {
    const { hostname, port, protocol } = new URL(process.env.IPFS_URL)
    const auth = 'Basic ' + Buffer.from(process.env.INFURA_PROJECT_ID + ':' +
    process.env.INFURA_API_KEY).toString('base64')
    this.client = create({
      host: hostname,
      port,
      protocol,
      headers: {
        authorization: auth
      }
    })
  }

  async store (payload) {
    const cid = await this.addAsJson(payload)
    return this.getTypeCid(cid, 'json')
  }

  /**
   *
   * @param {String} typeCid
   */
  async retrieve (typeCid) {
    const { cid, type, extension } = this.parseTypeCid(typeCid)
    const payload = await this._retrieve(cid, type, extension)
    if (!payload) {
      throw new Error(`No handler for type: ${type}`)
    }
    return {
      type,
      extension,
      payload
    }
  }

  /**
   * @param {String} cid
   * @param {String} type
   */
  async _retrieve (cid, type, extension) {
    if (extension === 'json') {
      return this.getFromJson(cid)
    }
    return null
  }

  /**
   * @param {*} data to store, the data will be JSON stringified
   * before storing
   * @returns {String} cid of the stored data
   */
  async addAsJson (data) {
    const json = JSON.stringify(data)
    const response = await this.add(json)
    return response.path
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {*} JSON parsed data identified by the cid
   */
  async getFromJson (cid) {
    const data = await this.cat(cid)
    return JSON.parse(new TextDecoder('utf-8').decode(data))
  }

  /**
   * @param {String or Uint8Array} data to store
   * @returns {String} cid of the stored data
   */
  async add (data) {
    return await this.client.pin.add(data)
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {Uint8Array} data identified by the cid
   */
  async get (cid) {
    return this.client.get(cid)
  }

  /**
   *
   * @param {String} cid
   * @param {String} extensionType extension or content type
   */
  getTypeCid (cid, extensionType) {
    const extension = extensionType.indexOf('/') > -1
      ? mime.extension(extensionType)
      : extensionType
    return `${cid.path || cid}:${extension}`
  }

  /**
   *
   * @param {String} typeCid
   */
  parseTypeCid (typeCid) {
    if (!typeCid) return { cid: '', extension: '', type: '' }
    const [cid, extension] = typeCid.split(':')
    return {
      cid,
      extension,
      type: mime.lookup(extension)
    }
  }
}

module.exports = BaseIpfs
