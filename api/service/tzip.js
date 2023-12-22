const { create } = require('ipfs-http-client')
const { TezosConstants } = require('../constants')
require('dotenv').config()

class TZIP {
  constructor ({
    artifactUri,
    attributes,
    creators,
    date,
    decimals,
    description,
    displayUri,
    formats,
    image,
    minter,
    mintingTool,
    name,
    rights,
    royalties,
    symbol,
    tags,
    thumbnailUri
  }) {
    this.params = {
      artifactUri,
      attributes,
      creators,
      date,
      decimals,
      description,
      displayUri,
      formats,
      image,
      minter,
      mintingTool,
      name,
      rights,
      royalties,
      symbol,
      tags,
      thumbnailUri
    }

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

  getMetadata () {
    return this.params
  }

  async getMetadataCID () {
    const metadataCID = await this.client.add(JSON.stringify(this.params))
    return 'ipfs://' + metadataCID.path
  }
}

class TZIPFactory {
  static createEntry ({
    artifactUri,
    attributes,
    creators,
    date,
    decimals,
    description,
    displayUri,
    formats,
    image,
    minter,
    mintingTool,
    name,
    rights,
    royalties,
    symbol,
    tags,
    thumbnailUri
  }) {
    return new TZIP({
      artifactUri,
      attributes,
      creators,
      date,
      decimals,
      description,
      displayUri,
      formats,
      image,
      minter,
      mintingTool,
      name,
      rights,
      royalties,
      symbol,
      tags,
      thumbnailUri
    })
  }

  static createWithDefaults ({
    artifact,
    attributes,
    creators,
    decimals,
    description,
    display,
    name,
    rights,
    royalties,
    symbol,
    tags,
    thumbnail
  }) {
    console.log('createWithDefaults', {
      artifact,
      attributes,
      creators,
      decimals,
      description,
      display,
      name,
      rights,
      royalties,
      symbol,
      tags,
      thumbnail
    })
    if (!name) {
      name = 'Blind Gallery Academy Certificate'
    }
    if (!description) {
      description = 'The Blind Gallery Club is an art community that focuses on digital and generative art. \n\nBesides accessing the community, members get early access and discounts to the Blind Gallery events and special ways to experience the blind concept. \n\nLearn more: https://www.blindgallery.xyz/club'
    }
    if (!tags) {
      tags = ['Blind Gallery', 'Blind Gallery Club', 'Club', 'Badge', 'Community']
    }
    if (!decimals) {
      decimals = 0
    }
    if (!symbol) {
      symbol = 'BGA'
    }
    if (!rights) {
      rights = 'No License / All Rights Reserved'
    }
    if (!attributes) {
      attributes = []
    }
    // if (!creators) {
    //   creators = ["tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr"]
    // }
    // if (!royalties) {
    //   royalties = {
    //     decimals: 4,
    //     shares: {
    //       "tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr": 1000,
    //     }
    //   }
    // }

    const artifactUri = artifact.uri
    let displayUri, thumbnailUri

    if (!artifact) {
      throw new Error('Artifact URI is required')
    }
    if (!display) {
      displayUri = artifact.uri
    } else {
      displayUri = display.uri
    }
    if (!thumbnail) {
      thumbnailUri = artifact.uri
    } else {
      thumbnailUri = thumbnail.uri
    }

    const formats = []
    if (artifact) {
      formats.push(artifact)
    }
    if (display) {
      formats.push(display)
    }
    if (thumbnail) {
      formats.push(thumbnail)
    }

    const minter = TezosConstants.CONTRACT_ADDRESSES.sbt
    const mintingTool = 'Blind Gallery Academy'
    const image = artifact.uri
    const date = new Date().toISOString()

    return TZIPFactory.createEntry({
      artifactUri,
      attributes,
      creators,
      date,
      decimals,
      description,
      displayUri,
      formats,
      image,
      minter,
      mintingTool,
      name,
      rights,
      royalties,
      symbol,
      tags,
      thumbnailUri
    })
  }
}

module.exports = TZIPFactory
