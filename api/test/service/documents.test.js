'use strict'

const { test } = require('tap')
const Documents = require('../../service/Documents.js')

test('documents works standalone', async (t) => {
  const documents = new Documents()
  t.ok(documents)
  t.end()
})

test('generation of templates works', async (t) => {
  const documents = new Documents()
  const template = await documents.getTemplateHtml('certificate')
  t.ok(template)
  t.type(template, 'string')
  t.end()
})

test('generateCertificate returns a valid CID', async (t) => {
  const documents = new Documents()
  const data = {
    student: 'John Doe',
    courseTitle: 'Blockchain',
    teacher: 'Hugo'
  }
  const { pdfCID, imageCID } = await documents.generateCertificate(data)
  t.ok(pdfCID)
  t.ok(imageCID)
  t.type(pdfCID, 'string')
  t.type(imageCID, 'string')
  t.end()
})
