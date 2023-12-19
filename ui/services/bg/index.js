// import { OpKind } from '@taquito/taquito'
import { Tezos } from '@/services/tezos/utils'

export default class Academy {
  constructor (signer) {
    this.tezos = Tezos
    this.tezos.setProvider({ signer })
  }

  async transfer ({ to, amount }) {
    await this.tezos.contract.transfer({ to, amount })
  }
}
