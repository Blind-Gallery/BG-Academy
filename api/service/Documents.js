const logger = require('./Logger')

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

  async uploadToIPFS (buffer, fileName) {
    const cid = await this.ipfs.add(buffer, fileName)
    logger.debug(`Document uploaded! - File hash: ${cid}`)
    if (!cid) {
      throw new Error('Error uploading file')
    }
    return cid
  }

  async getTemplateHtml (name) {
    logger.debug('Loading template file in memory')
    try {
      const invoicePath = path.resolve(`./templates/${name}.html`)
      return await readFile(invoicePath, 'utf8')
    } catch (err) {
      logger.error('Error loading template file:', err)
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
    logger.debug('Generating certificate')
    try {
      const res = await this.getTemplateHtml('certificate')
      const template = hb.compile(res, { strict: true })
      const html = template(data)
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/bin/chromium-browser',
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox']
      })
      const page = await browser.newPage()
      await page.setContent(html)
      const pdf = await page.pdf({ format: 'A4', landscape: true })
      const image = await page.screenshot({ fullPage: true })
      await browser.close()
      const pdfCID = await this.uploadToIPFS(pdf, `${data.student}-${data.courseTitle}-certificate.pdf`)
      const imageCID = await this.uploadToIPFS(image, `${data.student}-${data.courseTitle}-image.png`)
      return { pdfCID, imageCID }
    } catch (error) {
      logger.error(`Error while generating a certificate! ${error.message}`)
      throw error
    }
  }
}

module.exports = Documents
