const { describe, test, before, after } = require('node:test')
const assert = require('node:assert')
const { TezosConstants } = require('../../constants')

const DocumentsModel = require('../../model/Documents.js')

const {
  GQL,
  JWT,
  Email,
  Documents: Docs,
  SbtSmartContract
} = require('../../service')

const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
const {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SECRET
} = process.env

const gqlConfig = {
  endpoint: GRAPHQL_ENDPOINT,
  secret: GRAPHQL_SECRET
}
const gql = new GQL(gqlConfig)
const jwt = new JWT({})
const opts = {
  tokenExpirationTimeMins: 60,
  refreshTokenExpirationTimeMins: 1440
}
const sbtSC = new SbtSmartContract({ contract: TezosConstants.CONTRACT_ADDRESSES.sbt })

describe('Documents model', () => {
  test('Documents model works standalone', async (t) => {
    const documentsModel = new DocumentsModel({
      gql,
      jwt,
      email,
      opts,
      docs: new Docs(),
      sbtSC
    })

    assert.ok(documentsModel)
  })
})

describe('Documents model', () => {
  let documentsModel = null

  before(async () => {
    documentsModel = new DocumentsModel({
      gql,
      jwt,
      email,
      opts,
      docs: new Docs(),
      sbtSC
    })
  })

  test('Documents model works standalone', async (t) => {
    assert.ok(documentsModel)
  })

  test('Get contract storage from operation hash', async (t) => {
    // arrange
    const opHash = 'op8zy3gWFX8tozmxkZgsPYMrgoTQcD7QLXhaTvUyxKMfdXv61te'
    // act
    const contractStorage = await documentsModel.getContractStorageFromOperationHash(opHash)

    // assert
    assert.ok(contractStorage)
  })

  test('Get token id from operation hash', async (t) => {
    // arrange
    const opHash = 'op8zy3gWFX8tozmxkZgsPYMrgoTQcD7QLXhaTvUyxKMfdXv61te'
    // act
    const tokenId = await documentsModel.getSoulBoundTokenIdFromOpHash(opHash)

    // assert
    assert.ok(tokenId)
  })
})
