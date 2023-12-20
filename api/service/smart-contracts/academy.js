const { OpKind } = require('@taquito/taquito')
const { TezosConstants } = require('../../constants')
const BlindGalleryPermissions = require('./base')

const contract = TezosConstants.CONTRACT_ADDRESSES.academy

class Academy extends BlindGalleryPermissions {
  constructor () {
    super({ contract })
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
}

module.exports = Academy
