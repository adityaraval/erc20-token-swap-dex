import {combineReducers} from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection };
    case 'ACCOUNT_LOADED':
      return { ...state, account: action.account};
    default:
      return state;
  }
}

function contract(state = {}, action) {
  switch (action.type) {
    case 'CONTRACT_LOADED':
      return { ...state, contract: action.contract };
    case 'VALUE_LOADED':
      return { ...state, value: action.value };
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  web3, contract
});

export default rootReducer;