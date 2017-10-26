pragma solidity ^0.4.10;

import "./OracleContract4.sol";
import "./OracleResolver4.sol";

//my client contract
contract OracleApp4 {
    OracleResolver4 public resolver;
    OracleContract4 public oracle;

    function OracleApp4() {
        resolver = OracleResolver4(0x444078Aa15FE48B152245744cBD16023B2444C0e);//change the address to your OracleResolver.sol address
        resolver.setOracleAddress(0x08c152C90F2775915B1EBC88C218A9B86307A775);//change the address to your Oracle.sol address
        oracle = OracleContract4(resolver.getOracleAddress());
    }
    
    modifier myOracleAPI {
        _;
    }

    modifier onlyFromCallback {
        require(msg.sender == oracle.callbackAddress());
        _;
    }

    function queryOracle(string _query) internal myOracleAPI returns(bytes32 id) {
        return oracle.query(_query);
    }

    function _callback(bytes32 _id, string result) onlyFromCallback {
        //callback function for offchain to call back

    }
}

contract myClientContract4 is OracleApp4 {
    address owner;
    string public key;
    string public state;
    bytes32 id;
    event OnCallBack(bytes32 __id, string __result);
     // override
    function _callback(bytes32 _id, string result) onlyFromCallback {
        state = result;
        OnCallBack(_id, result);
    }
    function updateContract(string _state) myOracleAPI {
        state = _state;
        queryOracle(_state);
    }
    function updateContract2(string _state) myOracleAPI {
        key = "updateContract2";    
        state = _state;
    }
    function updateContract3(string _state) myOracleAPI {
        key = "updateContract3";    
        oracle.query(_state);
        state = _state;
    }
    function updateContract4(string _state) myOracleAPI {
        key = "updateContract4";    
        oracle.query(_state);
    }      
    function updateContract5() myOracleAPI returns (uint) {
        key = "updateContract5";    
        return  oracle.getRandomNumber();
    }
}