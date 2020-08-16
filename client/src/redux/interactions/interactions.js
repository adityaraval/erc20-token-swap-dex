import getWeb3 from "../../getWeb3";
import { web3Loaded, contractLoaded, accountLoaded, contractDataLoaded,tokenPurchased } from "../actions/actions";
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
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const tokenName = await contract.methods.name().call();
  const tokenSymbol = await contract.methods.symbol().call();
  const tokenSupply = await contract.methods.totalSupply().call();
  const tokenOwner = await contract.methods.owner().call();
  const balanceOfTokenOwner = await contract.methods.balanceOf(tokenOwner).call();
  const balanceOfTokenAddress = await contract.methods.balanceOf(contract._address).call();
  const mftBalance=  await contract.methods.balanceOf(account).call()
  const contractData = {
    tokenName,
    tokenSymbol,
    tokenSupply,
    tokenOwner,
    balanceOfTokenOwner,
    tokenAddress:contract._address,
    balanceOfTokenAddress,
    mftBalanceOfConnectedAccount : web3.utils.fromWei(mftBalance, 'Ether')
  }
  dispatch(contractDataLoaded(contractData));
  return contractData;
}

export const buyTokens = async (dispatch, ethVal, contract) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.buyTokens().send("Buy MFT","MFT Token Sale",{
        from: accounts[0],
        to: contract._address,
        gas: 5000000,
        value: web3.utils.toWei(ethVal, 'Ether')
    }).on("transactionHash", hash => {
        console.log("transaction hash", hash);
    });
    const purchasedMFT = ethVal * 100;
    dispatch(tokenPurchased(purchasedMFT));
    return purchasedMFT;
  } catch (e) {
    console.log(e.message);
  }
}