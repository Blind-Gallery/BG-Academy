'use strict'
const fs = require('fs')
const path = require('path')

const { test } = require('tap')
const Documents = require('../../service/Documents.js')

test('documents works standalone', async (t) => {
  const documents = new Documents()
  t.ok(documents)
  t.end()
})

test('generateCertificate returns a valid CID', async (t) => {
  const documents = new Documents()
  const data = {
    student: 'John Doe',
    courseTitle: 'Blockchain',
    teacher: 'Hugo'
  }
  const cid = await documents.generateCertificate(data)
  t.ok(cid)
  t.type(cid, 'string')
  t.end()
})
