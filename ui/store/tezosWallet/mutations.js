export function setWallet (state, wallet) {
  state.wallet = wallet
  state.isWalletConnected = wallet.isWalletConnected
  state.tezosAddress = wallet.tezosAddress
  state.publicKey = wallet.publicKey
  state.payload = wallet.payload
  state.signedMessage = wallet.signedMessage
}
