import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);

//CONTRACT
const contract = state => get(state, 'contract.contract', null);
export const contractSelector = createSelector(contract, a => a);

const value = state => get(state, 'contract.value', null);
export const valueSelector = createSelector(value, a => a);