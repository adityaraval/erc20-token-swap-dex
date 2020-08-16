import {combineReducers} from 'redux';

function web3(state = {
  accountData: {
    account: 'Loading..',
    balance:0
  },
}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection };
    case 'ACCOUNT_LOADED':
      return { ...state, accountData: action.accountData};
    default:
      return state;
  }
}

function contract(state = {
  contract:null,
  contractData: {
    tokenName: 'Loading..',
    tokenSymbol: 'Loading..',
    tokenSupply: 0,
    tokenOwner: 'Loading..',
    balanceOfTokenOwner: 0,
    tokenAddress: 'Loading..',
    balanceOfTokenAddress: 0,
    mftBalanceOfConnectedAccount: 0
  }
}, action) {
  switch (action.type) {
    case 'CONTRACT_LOADED':
      return { ...state, contract: action.contract };
    case 'CONTRACT_DATA_LOADED':
      return { ...state, contractData: action.contractData };
    case 'TOKEN_PURCHASED':
      return {
        ...state,
        contractData: {
          mftBalanceOfConnectedAccount: state.contractData.mftBalanceOfConnectedAccount + action.purchasedMFT,
          ...state.contractData
        }
      }
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  web3, contract
});

export default rootReducer;