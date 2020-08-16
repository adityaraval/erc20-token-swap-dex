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
  const connectAccount = async (e) => {
      e.preventDefault();
      const myWeb3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, myWeb3);
      const myContract = await loadContract(dispatch, myWeb3);
      await loadContractData(dispatch, myContract);
      subscribeToAccountsChanging(dispatch, myWeb3);
  }

  const purchase = async (e) => {
    e.preventDefault();
    await buyTokens(dispatch,ethVal, contract);
  }

  return (
      <Container className="py-2">
        <Row className="row justify-content-center">
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
        <Row className="justify-content-center py-3">
            <Col md={6}>
              <ListGroupItem>
                <b>Contract Name:</b> {contractData.name}<br/>
                <b>Contract Symbol:</b> {contractData.symbol}<br />
                <b>Total Supply:</b> {contractData.totalSupply}<br />
                <b>Contract Address:</b> {contractData.address}<br />
                <b>Balance of Token:</b> {contractData.balanceOfAddress}<br/>
                <b>Owner:</b> {contractData.owner}<br />
                <b>Balance of Owner:</b> {contractData.balanceOfOwner}<br/>
              </ListGroupItem>
            </Col>
            <Col md={6}>
              <ListGroupItem>
              <b>Your Account:</b> {accountData.account}<br/>
              <b>Your Balance:</b> {accountData.balance+` ETH`}
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
              <Form.Control type="text" placeholder="Associated MFT " disabled />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={accountData.account ? false : true}>
                Buy
              </Button>
        </Form>
      </Row>
      <Row>
          <span className="text-muted">Exchange Rate</span>
          <span className="text-muted">1 ETH = 100 MFT</span>
      </Row>
      </Container>
    )
}

export default MyFirstToken;
