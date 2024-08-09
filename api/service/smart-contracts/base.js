const { OpKind } = require('@taquito/taquito')
const log = require('pino')()
const { TezosConstants } = require('../../constants')
const TezosTransactions = require('../Tezos')

class BlindGalleryPermissions extends TezosTransactions {
  constructor ({ contract }) {
    super()
    this.contractAddress = contract
    this._initialized = this._initialize()
  }

  /**
   * @name _initialize
   * @description Initialize the contract
   * @returns {Promise} - Contract
   * @private
   */
  async _initialize () {
    const contract = await this.Tezos.wallet.at(this.contractAddress)
    this.contract = contract
  }

  /**
   * @name setAdministrator
   * @description Set the administrator of the contract
   * @param {String} address - Address of the administrator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async setAdministrator (address, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return log.error('Address is not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .set_administrator(address)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    return confirmation
  }

  /**
   * @name addModerator
   * @description Add a moderator to the contract
   * @param {String} address - Address of the moderator
   * @param {String} name - Name of the moderator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async addModerator (address, name, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return log.error('Address is not defined')
    }
    if (!name) {
      return log.error('Name is not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .add_moderator(address, name)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    return confirmation
  }

  /**
   * @name removeModerator
   * @description Remove a moderator from the contract
   * @param {String} address - Address of the moderator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async removeModerator (address, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return log.error('Address is not defined')
    }
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .remove_moderator(address)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(c)
    return confirmation
  }
}

module.exports = BlindGalleryPermissions
