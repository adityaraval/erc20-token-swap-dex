import React, { Component } from "react";
import {connect} from 'react-redux';
import "./App.css";
import { loadWeb3, loadContract, loadAccount, loadStoredData } from "./redux/interactions";
import { contractSelector, accountSelector, valueSelector } from "./redux/selectors";
import { subscribeToAccountsChanging } from "./redux/subscriptions";

class App extends Component {
  render() {
    const {dispatch, contract, account, value} = this.props;

    const connectBlockchain = async (e) => {
      e.preventDefault();
      const myWeb3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, myWeb3);
      const myContract = await loadContract(dispatch, myWeb3);
      await loadStoredData(dispatch, myContract);
      subscribeToAccountsChanging(dispatch, myWeb3);
    }

    return (
      <div className="container py-2">
        <div className="row justify-content-center">
          <div className="col-4">
            <form onSubmit={connectBlockchain}>
              <div className="form-group row">
                <div className="col-12">
                  <button type="submit" className={`w-100 btn text-truncate ${(contract !== null) ? "disabled btn-success" : "btn-danger"}`}>
                    {(contract !== null) ? "Blockchain Connected" : "Connect Blockchain"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <label>Account: {account}</label>
            <p>Changing accounts in Metamask should refresh this account address</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <label>Contract Value: </label>
            <label>{value}</label>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
	return {
    contract: contractSelector(state),
    account: accountSelector(state),
    value: valueSelector(state)
	}
}

export default connect(mapStateToProps)(App);
