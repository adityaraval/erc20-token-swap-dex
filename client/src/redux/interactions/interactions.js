import getWeb3 from "../../getWeb3";
import { web3Loaded, contractLoaded, accountLoaded, contractDataLoaded } from "../actions/actions";
import MyFirstTokenContract from "../../contracts/MyFirstToken.json";


export const loadWeb3 = async (dispatch) => {
  const web3 = await getWeb3();
  dispatch(web3Loaded(web3));
  return web3;
}

export const loadAccount = async (dispatch, web3) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const balance = await web3.eth.getBalance(account);
  const accountData = {
    account,
    balance:web3.utils.fromWei(balance, 'ether')
  }
  dispatch(accountLoaded(accountData));
  return accountData;
}

export const loadContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = MyFirstTokenContract.networks[networkId];
  const instance = new web3.eth.Contract(
    MyFirstTokenContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  dispatch(contractLoaded(instance));
  return instance;
}

export const loadContractData = async (dispatch, contract) => {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const totalSupply = await contract.methods.totalSupply().call();
  const owner = await contract.methods.owner().call();
  const balanceOfOwner = await contract.methods.balanceOf(owner).call();
  const balanceOfAddress = await contract.methods.balanceOf(contract._address).call();
  const contractData = {
    name,
    symbol,
    totalSupply,
    owner,
    balanceOfOwner,
    address:contract._address,
    balanceOfAddress
  }
  dispatch(contractDataLoaded(contractData));
  return contractData;
}

export const buyTokens = async (dispatch, ethVal, contract) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const owner = await contract.methods.owner().call();
    const result = await contract.methods.buyTokens().send({
        from: accounts[0],
        to: owner,
        gas: 30000,
        value: web3.utils.toWei(ethVal, 'Ether')
    });
    console.log(result);
    // dispatch(contractDataLoaded(contractData));
    // return contractData;
  } catch (e) {
    console.log(e.message);
  }
}