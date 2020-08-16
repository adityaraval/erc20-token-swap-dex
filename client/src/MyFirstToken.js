import React, { useState, useEffect } from "react";
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
  Form,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'react-bootstrap';
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

const MyFirstToken = () => {
  const contractData = useSelector(contractDataSelector,shallowEqual);
  const accountData = useSelector(accountDataSelector,shallowEqual);
  const contract = useSelector(contractSelector,shallowEqual);
  const dispatch = useDispatch();
  const [ethVal, setEthValue] = useState(0);
  const rate = 100;
  const connectAccount = async (e) => {
      e.preventDefault();
      const myWeb3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, myWeb3);
      const myContract = await loadContract(dispatch, myWeb3);
      await loadContractData(dispatch, myContract);
      subscribeToAccountsChanging(dispatch, myWeb3);
  }

  const purchase = async (e) => {
    if(e)
      e.preventDefault();
    await buyTokens(dispatch,ethVal, contract);
  }

  return (
      <Container className="py-2">
        <Row className="justify-content-center">
          <Col md={4}>
            <Form onSubmit={connectAccount}>
              <Row>
                <Col md={12}>
                  <Button type="submit" className={`w-100 btn text-truncate ${(contract !== null) ? "disabled btn-success" : "btn-danger"}`}>
                    {(contract !== null) ? "Account Connected" : "Connect Account"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
      </Row>
      <Row className="justify-content-center py-2">
        <Col md={2}>
            <b>Exchange Rate</b>
        </Col>
        <Col md={2}>
          <p><Badge variant="primary">1</Badge> <b>ETH</b> = <Badge variant="primary">{rate}</Badge> <b>MFT</b></p>
        </Col>
      </Row>
        <Row className="justify-content-center py-3">
            <Col md={6}>
              <ListGroupItem>
                <b>Token Name:</b> {contractData.tokenName}<br/>
                <b>Token Symbol:</b><Badge variant="primary"> {contractData.tokenSymbol}</Badge><br />
                <b>Total Token Supply:</b> {contractData.tokenSupply}<br /><br />
                <b>Token Address:</b> {contractData.tokenAddress}<br />
                <b>Available Tokens:</b> {contractData.balanceOfTokenAddress}<br/><br/>
                <b>Token Owner:</b> {contractData.tokenOwner}<br />
                <b>Balance of Token Owner:</b> {contractData.balanceOfTokenOwner}<br/>
              </ListGroupItem>
            </Col>
            <Col md={6}>
              <ListGroupItem>
              <b>Your Connected Account:</b> {accountData.account}<br/>
            <b>Your Account Balance:</b><br/>
            <Badge variant="primary">{accountData.balance}</Badge> <b>ETH</b><br/>
            <Badge variant="primary">{contractData.mftBalanceOfConnectedAccount}</Badge> <b>MFT</b>
              </ListGroupItem>
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Form onSubmit={purchase}>
            <Form.Group controlId="from">
              <Form.Label>From ETH</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Ether"
                value={ethVal}
              onChange={(e) => { setEthValue(e.target.value) }} />
            </Form.Group>
            <Form.Group controlId="to">
              <Form.Label>To MFT</Form.Label>
              <Form.Control type="text" value={ethVal * rate} placeholder="Associated MFT " disabled />
          </Form.Group>
            <small>MFT Token you will receive</small>
            <Button variant="primary" type="submit" disabled={accountData.account ? false : true}>
                Buy MFT
              </Button>
        </Form>
      </Row>
      </Container>
    )
}

export default MyFirstToken;
