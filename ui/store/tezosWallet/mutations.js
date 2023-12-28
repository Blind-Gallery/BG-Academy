export function setWallet (state, account) {
  state.wallet = account.beaconWallet
  state.isWalletConnected = account.isWalletConnected
  state.tezosAddress = account.tezosAddress
  state.publicKey = account.publicKey
  state.payload = account.payload
  state.signedMessage = account.signedMessage
}

export function disconnectWallet (state, account) {
  state.wallet = account.beaconWallet
  state.isWalletConnected = undefined
  state.tezosAddress = undefined
  state.publicKey = undefined
  state.payload = undefined
  state.signedMessage = undefined
}
