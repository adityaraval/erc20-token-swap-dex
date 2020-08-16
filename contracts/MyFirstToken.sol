pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyFirstToken is ERC20, Ownable {
    uint256 rate;
    constructor() public ERC20("MyFirstToken",'MFT'){
        _mint(msg.sender, 1000000000000000000000000);// 1 million tokens
        rate = 1;
    }

    event TokensPurchased(
      address account,
      address token,
      uint amount,
      uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );


    modifier contractHasEnoughBalance() {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;
        // Require that MyFirstToken has enough tokens
        require(balanceOf(this.owner()) >= tokenAmount,"Contract doesn't have enough balance");
        _;
    }

    function buyTokens() public payable contractHasEnoughBalance {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;
        // Transfer tokens to the user
        transferFrom(this.owner(), msg.sender, tokenAmount);
        // // Emit an event
        // emit TokensPurchased(msg.sender, address(this), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // User can't sell more tokens than they have
        require(balanceOf(msg.sender) >= _amount, "User doesn't have enough balance");
        // Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate;

        // Require that Contract has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit an event
        // emit TokensSold(msg.sender, address(this), _amount, rate);
    }

}