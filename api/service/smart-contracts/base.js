const { OpKind } = require('@taquito/taquito')
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
   * @name set_administrator
   * @description Set the administrator of the contract
   * @param {String} address - Address of the administrator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async set_administrator (address, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return console.error('Address is not defined')
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
   * @name add_moderator
   * @description Add a moderator to the contract
   * @param {String} address - Address of the moderator
   * @param {String} name - Name of the moderator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async add_moderator (address, name, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return console.error('Address is not defined')
    }
    if (!name) {
      return console.error('Name is not defined')
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
   * @name remove_moderator
   * @description Remove a moderator from the contract
   * @param {String} address - Address of the moderator
   * @param {Number} c - Confirmation blocks
   * @returns {Promise} - Confirmation
   */
  async remove_moderator (address, c = TezosConstants.DEFAULT_CONFIRMATION_BLOCKS) {
    if (!address) {
      return console.error('Address is not defined')
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
