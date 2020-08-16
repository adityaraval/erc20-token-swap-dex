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
    name: 'Loading..',
    symbol: 'Loading..',
    totalSupply: 0,
    owner: 'Loading..',
    balanceOfOwner: 0,
    address: 'Loading..',
    balanceOfAddress: 0,
  }
}, action) {
  switch (action.type) {
    case 'CONTRACT_LOADED':
      return { ...state, contract: action.contract };
    case 'CONTRACT_DATA_LOADED':
      return { ...state, contractData: action.contractData };
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  web3, contract
});

export default rootReducer;