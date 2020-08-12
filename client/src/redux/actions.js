export function web3Loaded(connection){
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function accountLoaded(account){
  return {
    type: 'ACCOUNT_LOADED',
    account
  }
}

export function contractLoaded(contract){
  return {
    type: 'CONTRACT_LOADED',
    contract
  }
}

export function valueLoaded(value){
  return {
    type: 'VALUE_LOADED',
    value
  }
}