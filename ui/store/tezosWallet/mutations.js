export function setWallet (state, wallet) {
  state.wallet = wallet
  state.isWalletConnected = wallet.isWalletConnected
  state.tezosAddress = wallet.tezosAddress
  state.isAllowed = wallet.isAllowed
  state.addedWallets = wallet.addedWallets
}
