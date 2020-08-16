import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const accountData = state => get(state, 'web3.accountData', null);
export const accountDataSelector = createSelector(accountData, a => a);

//CONTRACT
const contract = state => get(state, 'contract.contract', null);
export const contractSelector = createSelector(contract, a => a);

//CONTRACT DATA
const contractData = state => get(state, 'contract.contractData', null);
export const contractDataSelector = createSelector(contractData, n => n);