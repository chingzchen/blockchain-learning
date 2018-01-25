pragma solidity ^0.4.18;

contract TonnageCert {
/*
		○ GT=>gross tonnage (number, unit : Tons)
		○ NT -> Wet Tonnage (Number => Tons)
		○ Length (Numbers => meter, up to 2 decimal points)
		○ Breadth (Number => meter)
		○ Depth (Number => meter)
		○ Vessel name (Ship name)
		○ IMO Number  (Ship number) or Official Number
		○ Class Name
		○ Issue Date
Date of expiry
*/    
    string public Version = "V1.0-2018-01-24";
    uint32 public Length = 0;
    uint32 public Breadth = 0;
    uint32 public Depth = 0;
    string public NameOfShip = "";
    string public ClassName = "";
    uint public DateOfIssue = 0;
    uint32 public IMO = 0;
    string public GT;
    string public NT;

    function TonnageCert() {

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

    function UpdateInformation (string _NameOfShip,
                                uint32 _IMO,
                                uint32 _Length,
                                uint32 _Breadth,
                                uint32 _Depth,
                                string _ClassName,
                                uint _DateOfIssue,
                                string _GT,
                                string _NT) public payable
    {
        NameOfShip = _NameOfShip;
        IMO = _IMO;
        Length = _Length;
        Breadth = _Breadth;
        Depth = _Depth;
        ClassName = _ClassName;
        DateOfIssue = _DateOfIssue;
        GT = _GT;
        NT = _NT;
    }
}

