pragma solidity ^0.4.10;

contract Oracle {
    address owner;
    address public callbackAddress;

    event QueryEvent(bytes32 id, string query);

    function OracleContract () {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require(owner != msg.sender);
        _;
    }

    function query(string _query) returns (bytes32) {
        bytes32 id = sha3(block.number, now, _query, msg.sender);
        QueryEvent(id, _query);
        return id;
    }
}