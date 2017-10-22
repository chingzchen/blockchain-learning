pragma solidity ^0.4.10;

//interface of oracle contract
contract Oracle {
    address public callbackAddress;
    function query(string _query) returns (bytes32  id);
}

//interface of oracle resolver contract
contract OracleResolver {
    function getOracleAddress() constant returns (address);
}

//my client contract
contract OracleClient {
    OracleResolver resolver;
    Oracle oracle;

    modifier myOracleAPI {
        if (address(resolver) == 0) {
            resolver = OracleResolver(0xD25eB36df0315e04C5439fcbDc5c36326f652B7C);//change the address to your Oracle.sol address
            oracle = Oracle(resolver.getOracleAddress());
        }
        _;
    }

    modifier onlyFromCallback {
        require(msg.sender != oracle.callbackAddress());
        _;
    }

    function queryOracle(string _query) internal myOracleAPI returns(bytes32 id) {
        return oracle.query(_query);
    }

    function _callback(bytes32 _id, string result) onlyFromCallback {
        //callback function for offchain to call back
        
    }    
}

contract myContract is OracleClient {
    address owner;
    string public state;
    bytes32 id;
    event OnCallBack(bytes32 __id, string __result);
     // override
    function _callback(bytes32 _id, string result) onlyFromCallback {
        state = result;
        OnCallBack(_id, result);
    }
}