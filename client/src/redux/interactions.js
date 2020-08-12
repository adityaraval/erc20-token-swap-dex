import getWeb3 from "../getWeb3";
import { web3Loaded, contractLoaded, accountLoaded, valueLoaded } from "./actions";
import SimpleStorageContract from "../contracts/SimpleStorage.json";


export const loadWeb3 = async (dispatch) => {
  const web3 = await getWeb3();
  dispatch(web3Loaded(web3));
  return web3;
}

export const loadAccount = async (dispatch, web3) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(accountLoaded(account));
  return account;
}

export const loadContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SimpleStorageContract.networks[networkId];
  const instance = new web3.eth.Contract(
    SimpleStorageContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  dispatch(contractLoaded(instance));
  return instance;
}

export const loadStoredData = async (dispatch, contract) => {
  const value = await contract.methods.get().call();
  dispatch(valueLoaded(value));
  return value;
}