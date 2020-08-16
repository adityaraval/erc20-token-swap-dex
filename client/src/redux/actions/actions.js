export function web3Loaded(connection){
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function accountLoaded(accountData){
  return {
    type: 'ACCOUNT_LOADED',
    accountData
  }
}

export function contractLoaded(contract){
  return {
    type: 'CONTRACT_LOADED',
    contract
  }
}

export function contractDataLoaded(contractData){
  return {
    type: 'CONTRACT_DATA_LOADED',
    contractData
  }
}

export function tokenPurchased(purchasedMFT) {
  return {
    type: 'TOKEN_PURCHASED',
    purchasedMFT
  }
}