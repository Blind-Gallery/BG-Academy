import { create, urlSource } from 'ipfs-http-client'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import mime from 'mime-types'

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv'
dotenv.config()

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
   * @param {String} data to store
   * @returns {String} cid of the stored data
   */
  async fromUrl (url) {
    return this.client.add(urlSource(url))
  }

  /**
   * @param {String or Uint8Array} data to store
   * @returns {String} cid of the stored data
   */
  async add (data) {
    return this.client.add(data)
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {String} data identified by the cid
   */
  async cat (cid) {
    return uint8ArrayConcat(await all(this.client.cat(cid)))
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

class BrowserIpfs extends BaseIpfs {
  async store (payload) {
    if (payload instanceof File) {
      const cid = await this.addFile(payload)
      return this.getTypeCid(cid, payload.type)
    }
    return super.store(payload)
  }

  /**
   * @param {String} cid
   * @param {String} type
   */
  async _retrieve (cid, type, extension) {
    const result = await super._retrieve(cid, type)
    if (result) {
      return result
    }
    if (!cid) return ''
    const fileName = `${cid}.${extension}`
    return this.getFile(cid, fileName, type)
  }

  /**
   * @param {File} file to store
   * @returns {String} cid of the stored file
   */
  async addFile (file) {
    const data = new Uint8Array(await file.arrayBuffer())
    return this.add(data)
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {File} file identified by the cid
   */
  async getFile (cid, name, type) {
    const data = await this.cat(cid)
    return new File([data], name, { type })
  }

  /**
   * @param {String} cid of the data that is wanted
   * @returns {File} file identified by the cid
   */
  async readFileAsText (file) {
    const fileReader = new FileReader()
    return new Promise((resolve, reject) => {
      fileReader.onload = function (e) {
        resolve(JSON.parse(e.target.result))
      }
      fileReader.onerror = function (e) {
        reject(e)
      }
      fileReader.readAsText(file.payload)
    })
  }
}

export default new BrowserIpfs()
