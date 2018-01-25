pragma solidity ^0.4.18;

contract ClassCert {
/*
CLASS Cert
	- From Blockchain perspective
	• From
		○ Class
	• To
		○ Shipowner
	• Viewed by
		○ Class
		○ Shipowner
		○ MPA
	- Content of Class cert
	• Name of Vessel
	• IMO Number or Official Number
	• Ship Type (category of ship) => A label, string
	• Date of issue
	• Date of expiry
	• GT
	• NT
	• Class Name (Name of Class)

*/    
    string public Version = "V1.0-2018-01-24";
    string public NameOfShip = "";
    uint32 public IMO = 0;
    string public ShipType = "";
    string public ClassName ="";
    uint public DateOfIssue;
    uint public DateOfExpiry;
    string public GT;
    string public NT;

    function ClassCert () {

    }
    
    function stringsEqual(string memory _a, string memory _b)  returns (bool) {
                bytes memory a = bytes(_a);
                bytes memory b = bytes(_b);
                if (a.length != b.length) {
                        return false;
        }

                for (uint i = 0; i < a.length; i ++) {
                        if (a[i] != b[i])
                                return false;
        }
                return true;
	}

	//event CertStateChanged(ContractStates newState);
    //enum ContractStates {Initiated, OwnerVerify, Completed, Signed }
	//ContractStates public State;

    function checkExpiry(uint start) public returns (bool) {
        return DateOfIssue + 1 years >= DateOfExpiry;
    }
	
    function UpdateInformation (string  _NameOfShip,
                                uint32  _IMO,
                                string  _ShipType,
                                string  _ClassName,
                                uint  _DateOfIssue,
                                uint  _DateOfExpiry,
                                string  _GT,
                                string _NT) public payable
    {
		NameOfShip =  _NameOfShip;
		IMO = _IMO;
        ShipType = _ShipType;
        ClassName = _ClassName;
        DateOfIssue = _DateOfIssue;
        DateOfExpiry = _DateOfExpiry;
        GT = _GT;
        NT = _NT;
    }
}

