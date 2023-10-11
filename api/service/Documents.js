const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const IPFS = require('./IPFS')

class Documents {
  constructor () {
    this.ipfs = new IPFS()
  }

  /**
 * Uploads a file to IPFS.
 *
 * @param {string} fileName - The name of the file to upload.
 * @returns {Promise<Object>} An object containing the IPFS upload information.
 */
  async ipfsUpload (fileName) {
    const buffer = fs.readFileSync(`${fileName}`)
    const ipfs = await this.ipfs.add({ content: buffer })
    return ipfs
  }

  async getTemplateHtml (name) {
    console.info('Loading template file in memory')
    try {
      const invoicePath = path.resolve(`./templates/${name}.html`)
      return await readFile(invoicePath, 'utf8')
    } catch (err) {
      return Promise.reject(new Error('Could not load html template'))
    }
  }

  /**
   *
   * @param {*} data
   * @returns {Promise<string>} -> CID of the generated certificate
   *
   * @example
   * const data = {
   *   name: 'John Doe',
   *   courseTitle: 'Blockchain',
   *   teacher: 'Hugo'
   * }
   */
  async generateCertificate (data) {
    let cid = ''
    this.getTemplateHtml('certificate').then(async (res) => {
      const template = hb.compile(res, { strict: true })
      const html = template(data)
      const browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage()
      await page.setContent(html)
      const pdf = await page.pdf({ format: 'A4' })
      await browser.close()
      const ipfs = await this.ipfs.add({ content: pdf })
      cid = ipfs.path
      return ipfs.path
    }).catch(err => {
      console.error(err)
    })

    return cid
  }
}

module.exports = Documents
