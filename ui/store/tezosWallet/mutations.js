export function setWallet (state, wallet) {
  state.wallet = wallet
  state.isWalletConnected = wallet.isWalletConnected
  state.tezosAddress = wallet.tezosAddress
  state.publicKey = wallet.publicKey
  state.payload = wallet.payload
  state.signedMessage = wallet.signedMessage
}

export function disconnectWallet (state, wallet) {
  // state.wallet.client.clearActiveAccount()
  // state.wallet.client.removeAllAccounts()
  // state.wallet.client.removeAllPeers()
  // state.wallet.client.destroy()
  state.wallet = wallet
  state.isWalletConnected = undefined
  state.tezosAddress = undefined
  state.publicKey = undefined
  state.payload = undefined
  state.signedMessage = undefined
}
