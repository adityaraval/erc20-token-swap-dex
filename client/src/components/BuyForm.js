import React from 'react';
import {
  Button,
  Form,
} from 'react-bootstrap';
const BuyForm = ({ buy, rate, amount, setAmount,accountData }) => (
  <Form onSubmit={buy}>
    <Form.Group controlId="from">
      <Form.Label>From ETH</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Ether"
        value={amount}
        onChange={(e) => { setAmount(e.target.value) }} />
    </Form.Group>
    <Form.Group controlId="to">
      <Form.Label>To MFT</Form.Label>
      <Form.Control type="text" value={`${amount * rate} Estimated MFT you will get in your account`} disabled />
    </Form.Group>
    <Button variant="success" type="submit" disabled={accountData.account ? false : true}>
      Buy MFT
    </Button>
  </Form>
);

export default BuyForm;