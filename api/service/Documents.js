const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)

class Documents {
  async getTemplateHtml (name) {
    console.info('Loading template file in memory')
    try {
      const invoicePath = path.resolve(`./templates/${name}.html`)
      return await readFile(invoicePath, 'utf8')
    } catch (err) {
      return Promise.reject(new Error('Could not load html template'))
    }
  }

  async generateCertificate (data) {
    // const data = {
    //   student: 'John Doe',
    //   courseTitle: 'Course Title',
    //   teacher: 'Hugo'
    // }
    this.getTemplateHtml('certificate').then(async (res) => {
      const template = hb.compile(res, { strict: true })
      const html = template(data)
      const browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage()
      await page.setContent(html)
      const pdf = await page.pdf({ format: 'A4' })
      await browser.close()
      return pdf
    }).catch(err => {
      console.error(err)
    })
  }
}

module.exports = Documents
