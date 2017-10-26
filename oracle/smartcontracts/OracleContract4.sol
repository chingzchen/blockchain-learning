
pragma solidity ^0.4.10;

contract OracleContract4 {
    address owner;
    address public callbackAddress;
    string public state;

    event QueryEvent(bytes32 id, string query);

    function OracleContract4 () {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require(owner == msg.sender);
        _;
    }
    function setCallbackAddress(address _callbackAddress) {
        callbackAddress = _callbackAddress;
    }

    function getRandomNumber() returns (uint) {
        state = "getRandomNumber";
        return 12;
    }

    function query(string _query) returns (bytes32) {
        state = "query1";
        bytes32 id = sha3(block.number, now, _query, msg.sender);
        state = "query2";
        QueryEvent(id, _query);
        state = "query3";
        return id;
    }
}