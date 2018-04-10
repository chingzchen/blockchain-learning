pragma solidity ^0.4.18;

contract BuilderCert {
/*
	• Full Name of the ship
	• IMO Number of the Ship (Permanent, won't change)
	• HULL Number (Project number, per-ship, won't change)
	• Ship Owner's name
	• Shop Owner's full registration address (as per ACRA)
	• Date of Builder cert
	• Identity of person who signs the cert
	• Designation of signatory
	• Date of Expiry
	• Shipyard address (where the ship is built)
	Power of Attorney
		○ Date of POA is signed
		○ Name of signatory
		○ Designation of signatory
	- From Blockchain's perspective
		○ From
			§ Shipyard
		○ To
			§ Shipowner
		○ Accessed by
			§ MPA & Shipowner
	- UI
		○ Put info for issuing Builder Cert
		○ Owner -> See transactions
    MPA -> See cert info
*/    


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

	event CertStateChanged(ContractStates newState);
	
    enum ContractStates {Initiated, OwnerVerify, Completed, Signed }
	
    struct PowerOfAttorney {
        uint DateOfPOA;
        string NameOfSignatory;
        string DesignationOfSignatory;
    }
    PowerOfAttorney POA;
    string public NameOfShip = "";
    uint32 public IMO = 0;
    uint32 public HULLNumber = 0;
    string public ShipownerName = "";
    string public ShopownerAddress ="";
    uint public DateOfIssue;
    uint public DateOfExpiry;
    string public ShipyardAddress;
	ContractStates public State;

    function checkExpiry(uint start) public returns (bool) {
        return DateOfIssue + 1 years >= DateOfExpiry;
    }

    function BuilderCert() {
		State = ContractStates.Initiated;
    }
	/*
	        uint DateOfPOA;
        string NameOfSignatory;
        string DesignationOfSignatory;
	*/
	function GetPOA () public returns (string ,string, uint){
                /*
                struct PowerOfAttorney {
                        uint DateOfPOA;
                        string NameOfSignatory;
                        string DesignationOfSignatory;
                }
                */
                return (POA.NameOfSignatory, POA.DesignationOfSignatory, POA.DateOfPOA);
	}
	
	function Sign(string nameOfSignatory, string designationOfSignatory) public returns (bool) {
		/*require(
			!stringsEqual(nameOfSignatory,"") &&
			!stringsEqual(designationOfSignatory,""));

		require( !stringsEqual("", NameOfShip) && 
                (IMO > 0) && 
                (HULLNumber > 0) && !stringsEqual("",ShipownerName) &&
				!stringsEqual("",ShopownerAddress) &&
				DateOfIssue > 0 &&
				DateOfExpiry > 0 &&
				!stringsEqual("",ShipyardAddress) &&
				State == ContractStates.Completed);*/
		POA.DateOfPOA = now;
		POA.NameOfSignatory = nameOfSignatory;
		POA.DesignationOfSignatory = designationOfSignatory;
		ChangeState(ContractStates.Signed);
		return true;
	}
	function ChangeState(ContractStates newState) {
		State = newState;
		CertStateChanged(newState);
	}
	function Verify(bool verifyResult) public returns (bool) {
		require(State == ContractStates.Initiated);
		
		if(verifyResult) {
			CertStateChanged(ContractStates.Completed);
		} else {
			CertStateChanged(ContractStates.OwnerVerify);
		}
		
		return true;
	}
    function UpdateInformation (string  _NameOfShip,
                                uint32  _IMO,
                                uint32  _HULLNumber,
                                string  _ShipownerName,
                                string  _ShopownerAddress,
                                string  _DesignationOfSignatory ,
                                string  _PowerOfAttorney ,
                                uint  _DateOfIssue,
                                uint  _DateOfExpiry,
                                string  _ShipyardAddress) public payable {
		NameOfShip =  _NameOfShip;
		IMO = _IMO;
		HULLNumber = _HULLNumber;
		ShipownerName = _ShipownerName;
		ShopownerAddress = _ShopownerAddress;
		DateOfIssue = _DateOfIssue;
		DateOfExpiry = _DateOfExpiry;
		ShipyardAddress = _ShipyardAddress;
			
		ChangeState(ContractStates.OwnerVerify);	
    }

}


