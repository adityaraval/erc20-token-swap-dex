import React from 'react';
import {
  Button,
  Form,
} from 'react-bootstrap';
const BuyForm = ({ sale, rate, amount, setAmount,accountData }) => (
  <Form onSubmit={sale}>
    <Form.Group controlId="from">
      <Form.Label>From MFT</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter MFT"
        value={amount}
        onChange={(e) => { setAmount(e.target.value) }} />
    </Form.Group>
    <Form.Group controlId="to">
      <Form.Label>To ETH</Form.Label>
      <Form.Control type="text" value={`${amount / rate} Estimated ETH you will get in your account`} disabled />
    </Form.Group>
    <Button variant="success" type="submit" disabled={accountData.account ? false : true}>
      Sell MFT
    </Button>
  </Form>
);

export default BuyForm;