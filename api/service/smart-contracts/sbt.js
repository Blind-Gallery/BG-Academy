const { MichelsonMap, OpKind } = require('@taquito/taquito')
const { char2Bytes } = require('@taquito/tzip16')
const logger = require('../Logger')
const { TezosConstants } = require('../../constants')
const BlindGalleryPermissions = require('./base')

class SoulBondCertificates extends BlindGalleryPermissions {
  constructor ({ contract }) {
    super({ contract })
  }

  /**
   * @name burn
   * @description Burn a list burning objects, a burning object is an object with the following structure: { >from_: <address>, token_id: <number>, amount: <number }
   * @param {Array} params - List of burning objects
   * @param {Number} c - Confirmation blocks
   */
  async burn (params, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!params) {
      return logger.error('Params are not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .burn(params)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    return confirmation
  }

  /**
   * @name mint
   * @description Mint a list of new badges, a new badge object is an object with the following structure: { to_: <address>, token: <Variant>, amount: <number> }
   * @param {Array} params - List of new badge objects
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async mint (params, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!params) {
      return logger.error('Params are not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .mint(params)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    const status = await batchOperation.status()
    const opHash = batchOperation.opHash
    if (status === 'applied') {
      logger.info('Minted')
    }
    return { confirmation, status, opHash }
  }

  /**
   * @name createBadge
   * @description Make a mint object to mint a new badge
   * @param {String} to_ - Address to mint the badge
   * @param {Object} token - Token to mint
   * @param {Number} amount - Amount to mint
   * @returns {Object} - Mint object
   */
  createBadge (to_, ipfs, amount) {
    return {
      to_,
      token: { new: MichelsonMap.fromLiteral({ '': char2Bytes(ipfs) }) },
      amount
    }
  }

  /**
   * @name giveBadge
   * @description Make a mint object to give an existing badge to an user
   * @param {String} to_ - Address to mint the badge
   * @param {Number} token_id - Token to mint
   * @param {Number} amount - Amount to mint
   * @returns {Object} - Mint object
   */
  giveBadge (to_, tokenId, amount) {
    return {
      to_,
      token: { existing: tokenId },
      amount
    }
  }

  /**
   * @name burnBadge
   * @description Make a burn object to burn a badge from a user
   * @param {String} from_ - Address to burn the badge
   * @param {Number} token_id - Token to burn
   * @param {Number} amount - Amount to burn
   * @returns {Object} - Burn object
   */
  burnBadge (from_, tokenId, amount) {
    return {
      from_,
      token_id: tokenId,
      amount
    }
  }

  /**
   * @name transfer
   * @description Transfer a list of badges, a transfer object is an object with the following structure: { from_: <address>, txs: [ { to_: <address>, token_id: <number>, amount: <number> } ] }
   * @param {Array} params - List of transfer objects
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation (it always returns an error as the Badges are not transferable)
   */
  async transfer (params, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!params) {
      return logger.error('Params are not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .transfer(params)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    return confirmation
  }
}

module.exports = SoulBondCertificates
