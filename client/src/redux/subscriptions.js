import { loadAccount } from "./interactions";

export const subscribeToAccountsChanging = (dispatch, web3) => {
  window.ethereum.on('accountsChanged', async function (accounts) {
    await loadAccount(dispatch, web3);
  });
}