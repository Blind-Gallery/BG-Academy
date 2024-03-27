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

  async uploadToIPFS (file) {
    console.log(typeof file)
    const data = await this.ipfs.add({ content: file })
    const cid = data.path
    return cid
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
   *   student: 'John Doe',
   *   courseTitle: 'Blockchain',
   *   teacher: 'Hugo'
   * }
   */
  async generateCertificate (data) {
    try {
      const res = await this.getTemplateHtml('certificate')
      const template = hb.compile(res, { strict: true })
      const html = template(data)
      const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
      const page = await browser.newPage()
      await page.setContent(html)
      const pdf = await page.pdf({ format: 'A4' })
      const image = await page.screenshot({ fullPage: true })
      await browser.close()
      const pdfIPFS = await this.ipfs.add({ content: pdf })
      const pdfCID = pdfIPFS.path
      const imageIPFS = await this.ipfs.add({ content: image })
      const imageCID = imageIPFS.path
      return { pdfCID, imageCID }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = Documents
