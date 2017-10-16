pragma solidity ^0.4.2;

contract SimpleContract {
    address owner;
    uint public exchangeRate;
    function SimpleContract() {
        owner = msg.sender;
    }
    function UpdateExchangeRate(uint newRate) {
        exchangeRate = newRate;
    }
}