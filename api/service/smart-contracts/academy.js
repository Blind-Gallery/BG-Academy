const { OpKind } = require('@taquito/taquito')
const { TezosConstants } = require('../../constants')
const BlindGalleryPermissions = require('./base')

class Academy extends BlindGalleryPermissions {
  constructor ({ contract }) {
    super({ contract })
  }

  /**
   * @param {number} id
   * @param {string} name
   * @param {string} description
   * @param {string} content
   * @param {number} prince in usd cents
   * @param {bool} isActive
   * @returns {Promise}
   */
  async createCourse ({ id, name, description, content, price, isActive }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .create_course(content, description, id, isActive, name, price)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @param {string} user
   * @param {string} soulBoundTokenId
   * @returns {Promise}
   */
  async addCourseToUser ({ courseId, user, soulBoundTokenId = 0 }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .add_course_to_user(courseId, soulBoundTokenId, user)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @param {string} name
   * @param {string} description
   * @param {string} content
   * @param {number} prince in usd cents
   * @param {bool} isActive
   * @returns {Promise}
   */

  async updateCourse ({ courseId, name, description, content, price, isActive }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .update_course(courseId, content, description, isActive, name, price)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @returns {Promise}
   */
  async deleteCourse ({ courseId }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .delete_course(courseId)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @param {number} price
   */
  async payCourse ({ courseId, user, price }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .buy_course(courseId, user)
            .toTransferParams({ amount: price })
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @param {string} user
   */
  async removeCourseFromUser ({ courseId, user }) {
    await this._initialized
    const batchOperation = await this.Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...this.contract.methods
            .remove_course_from_user(courseId, user)
            .toTransferParams()
        }
      ])
      .send()

    const confirmation = await batchOperation.confirmation(TezosConstants.DEFAULT_CONFIRMATION_BLOCKS)
    return confirmation
  }

  /**
   * @param {number} courseId
   * @param {string} user
   */
}

module.exports = Academy
