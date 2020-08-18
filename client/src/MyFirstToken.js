import React, { useState } from "react";

import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux';

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Image
} from 'react-bootstrap';

import { Tabs, Tab, Panel } from '@bumaga/tabs';

import {
  loadWeb3,
  loadContract,
  loadAccount,
  loadContractData,
  buyTokens
} from "./redux/interactions/interactions";

import {
  contractSelector,
  accountDataSelector,
  contractDataSelector
} from "./redux/selectors/selectors";
import { subscribeToAccountsChanging } from "./redux/subscriptions/subscriptions";

import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
import MetaMaskLogo from './assets/metamask-logo.svg';

const MyFirstToken = () => {
  const contractData = useSelector(contractDataSelector,shallowEqual);
  const accountData = useSelector(accountDataSelector,shallowEqual);
  const contract = useSelector(contractSelector,shallowEqual);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const rate = 100;

  const connectAccount = async (e) => {
      const myWeb3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, myWeb3);
      const myContract = await loadContract(dispatch, myWeb3);
      await loadContractData(dispatch, myContract);
      subscribeToAccountsChanging(dispatch, myWeb3);
  }

  const buy = async (e) => {
    if (e)
      e.preventDefault();
    await buyTokens(dispatch, amount, contract);
  };

  return (
    <>
      <Row className="justify-content-end">
        <Col md={4} className="d-flex align-items-center">
            <Badge variant="primary">1</Badge>
            <b>ETH</b> = <Badge variant="primary">{rate}</Badge> <b>MFT</b>
              <Button variant="default" onClick={connectAccount} className={`w-100 btn text-truncate wallet-connecter ${(contract !== null) ? "btn-default" : "btn-default disabled"}`}>
                  <div className={`${(contract !== null) ? "online" : "offline"}`} />
                  <Image src={MetaMaskLogo} />
              </Button>
          </Col>
      </Row>
      <Container className="py-2">
        <Row className="justify-content-center py-3">
          <Col md={6}>
              <Card>
                <Card.Header>Token Info</Card.Header>
                <Card.Body>
                  <Card.Text>
                              <b>Token Name:</b> {contractData.tokenName}<br/>
                              <b>Token Symbol:</b><Badge variant="primary"> {contractData.tokenSymbol}</Badge><br />
                              <b>Total Token Supply:</b> {contractData.tokenSupply}<br /><br />
                              <b>Token Address:</b> {contractData.tokenAddress} <a href={`https://ropsten.etherscan.io/address/${contractData.tokenAddress}`}>View</a><br />
                              <b>Available Tokens:</b> {contractData.balanceOfTokenAddress}<br /><br />
                              <b>Token Owner:</b> {contractData.tokenOwner}<a href={`https://ropsten.etherscan.io/address/${contractData.tokenOwner}`}>View</a><br />
                              <b>Balance of Token Owner:</b> {contractData.balanceOfTokenOwner}<br/>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
                <Card>
                  <Card.Header>Your Info</Card.Header>
                  <Card.Body>
                    <Card.Text>
                              <b>Your Connected Account:</b> {accountData.account}<a href={`https://ropsten.etherscan.io/address/${accountData.account}`}>View</a> <br/>
                            <b>Your Account Balance:</b><br/>
                            <Badge variant="primary">{accountData.balance}</Badge> <b>ETH</b><br/>
                            <Badge variant="primary">{contractData.mftBalanceOfConnectedAccount}</Badge> <b>MFT</b>
                    </Card.Text>
                  </Card.Body>
                </Card>
            </Col>
        </Row>

        <Card>
          <Card.Header>Swap ETH & MFT</Card.Header>
            <Card.Body>
              <Tabs>
                <Row className="d-flex justify-content-center py-3">
                    <Col md={8}>
                      <Tab><Button variant="secondary" className="mr-3">Buy MFT</Button></Tab>
                      <Tab><Button variant="primary">Sell MFT</Button></Tab>
                    </Col>
                </Row>
                <Row className="justify-content-center py-3">
                  <Col md={8}>
                    <Panel>
                      <BuyForm
                      buy={buy}
                      amount={amount}
                      setAmount={setAmount}
                      rate={rate}
                      accountData={accountData}
                    />
                    </Panel>
                    <Panel>
                        <SellForm
                        sale={buy}
                        amount={amount}
                        setAmount={setAmount}
                        rate={rate}
                        accountData={accountData}
                      />
                    </Panel>
                    </Col>
                  </Row>
                </Tabs>
              </Card.Body>
            </Card>
      </Container>
      </>
    )
}

export default MyFirstToken;
