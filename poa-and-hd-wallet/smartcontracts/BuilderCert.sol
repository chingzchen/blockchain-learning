pragma solidity ^0.4.18;

contract BuilderCert {
	event CertStateChanged(ContractStates newState);
	
    enum ContractStates {Initiated, OwnerVerify, Completed, Signed }
	ContractStates State;
    struct PowerOfAttorney {
        uint DateOfPOA;
        string NameOfSignatory;
        string DesignationOfSignatory;
    }

    string public NameOfShip = "";	
    uint32 public IMO = 0;
	string public OfficialNo = "";
    string public ShipownerName = "";
    string public ShopownerAddress ="";
	string public CallSign = "";
	string public ClassSociety = "";
	string public ScreenshotHash = "";
	function RequestBuilderCert(string nameOfShip, uint32 imo, string officialNo,
							string shipownerName, string shipAddress,
							string callsign, string classSociety,
							string hashString) public payable {
		ScreenshotHash = hashString;
		NameOfShip = nameOfShip;	
		IMO = imo;
		OfficialNo = officialNo;
		ShipownerName = shipownerName;
		ShopownerAddress = shipAddress;
		CallSign = callsign;
		ClassSociety = classSociety;
	}
    PowerOfAttorney POA;
	string public ShipyardName = "";
    string public ShipyardAddress;
    uint public HULLNumber = 0;
	string public Country = "";
	string public HullMaterial = "";

	function SubmitBuilderCertVerification (string shipyardName, string shipyardAddress,
									uint hullNumber, string country, string hullMaterial,
									string designation, string singatory) public payable {
		ShipyardName = shipyardName;
		ShipyardAddress = shipyardAddress;
		HULLNumber = hullNumber;
		Country = country;
		HullMaterial = hullMaterial;
		POA.DateOfPOA = now;
		POA.DesignationOfSignatory = designation;
		POA.NameOfSignatory = singatory;

	}

    struct ShipownerInfo {
        string MobileNo;
		string PhoneNo;
		string EMail;
		string Country;
		string Nationality;
		uint NumberOfShares;
		uint PaidUpCapital;	//PUC * 100
		uint LocalEquity;	//LE * 100
		uint ForeignhEquity;	//FE * 100
    }
	ShipownerInfo Shipowner;

	function UpdateShipownerInfo (string mobileNo, string phoneNo, string email, string country,
									string nationality, uint numberOfShares, uint paidUpCapital,
									uint localEquity, uint foreignEquity) public payable {
		Shipowner.MobileNo = mobileNo;
		Shipowner.PhoneNo = phoneNo;
		Shipowner.EMail = email;
		Shipowner.Country = country;
		Shipowner.Nationality = nationality;
		Shipowner.NumberOfShares = numberOfShares;
		Shipowner.PaidUpCapital = paidUpCapital;
		Shipowner.LocalEquity = localEquity;
		Shipowner.ForeignhEquity = foreignEquity;
	}
	
	function GetShipownerContactInfo() public returns (string, string, string, string, string) {
		return (
			Shipowner.MobileNo,
			Shipowner.PhoneNo,
			Shipowner.EMail,
			Shipowner.Country,
			Shipowner.Nationality
		);
	}
	
	function GetShipownerInfo() public returns (uint, uint, uint, uint) {
		return (
			Shipowner.NumberOfShares,
			Shipowner.PaidUpCapital,
			Shipowner.LocalEquity,
			Shipowner.ForeignhEquity
		);
	}
	
	struct ManagerInfo {
		string Name;
		string Address;
		string MobileNo;
		string PhoneNo;
		string EMail;
		string ContractPerson;
		string StatusInCompany;
		string AccountNumber;
		string UEN;
		string ISMCompanyName;
	}
	ManagerInfo Manager;
	
	function UpdateManagerInfo (string name, string addr,string mobileNo,
							string phoneNo,string eMail, string contractPerson,
							string statusInCompany,string accountNumber,string uem,
							string ismCompanyName) public payable {
		Manager.Name = name;
		Manager.Address = addr;
		Manager.MobileNo = mobileNo;
		Manager.PhoneNo = phoneNo;
		Manager.EMail = eMail;
		Manager.ContractPerson = contractPerson;
		Manager.StatusInCompany = statusInCompany;
		Manager.AccountNumber = accountNumber;
		Manager.UEN = uem;
		Manager.ISMCompanyName = ismCompanyName;
	}
	
	function GetManagerContactInfo () public returns (string, string, string, string, string, string) {
		return (
			Manager.Name,
			Manager.Address ,
			Manager.MobileNo ,
			Manager.PhoneNo,
			Manager.EMail,
			Manager.ContractPerson
		);
	}
	
	function GetManagerInfo () public returns (string, string, string, string) {
		return (
			Manager.StatusInCompany,
			Manager.AccountNumber,
			Manager.UEN,
			Manager.ISMCompanyName
		);
	}
	
	struct SupportingDocuments {
		string ACRA;
		string BuilderCert;
	}
	SupportingDocuments SupportingDocs;

	function UpdateDocuments (string acra, string builderCert) public payable {
		SupportingDocs.ACRA = acra;
		SupportingDocs.BuilderCert = builderCert;
	}
	function GetSupportingDocsInfo () returns (string, string){
		return (SupportingDocs.ACRA , SupportingDocs.BuilderCert);
	}
    function BuilderCert() {
		State = ContractStates.Initiated;
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
	function GetPOA () public returns (string ,string, uint){
		return (POA.NameOfSignatory, POA.DesignationOfSignatory, POA.DateOfPOA);
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
}


