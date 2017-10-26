pragma solidity ^0.4.10;

contract OracleResolver4 {
    address owner;
    address public oracleAddress;

    function OracleResolver4() {
        owner = msg.sender;
    }

    modifier onwerOnly {
        require(msg.sender == owner);
        _;
    }

    function setOracleAddress(address addr) {
        oracleAddress = addr;
    }

    function getOracleAddress() constant returns (address) {
        return oracleAddress;
    }
}