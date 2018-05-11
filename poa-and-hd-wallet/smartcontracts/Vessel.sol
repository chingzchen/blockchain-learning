pragma solidity ^0.4.18;

import "./BuilderCert.sol";
import "./ProvisionalClassification.sol";
//import "./ProvisionalRegistration.sol";

contract Vessel {
	mapping (uint => address) builderCerts;
	mapping (uint => address) provisionalClassCerts;
	//mapping (uint => address) provisionalRegistration;

	function Vessel () {
	}
	/*
	function NewProvisionalRegistration(uint imo) public payable {
		ProvisionalRegistration registration = new ProvisionalRegistration();
		provisionalRegistration[imo] = address(registration);
	}

	function GetProvisionalRegistration(uint imo) public returns (address) {
		return provisionalRegistration[imo];
	}
	*/
	function NewBuilderCert(uint32 imo) public payable {
		BuilderCert builderCert;
		builderCert = new BuilderCert();
		builderCerts[imo] = address(builderCert);
		/*
		builderCert.RequestBuilderCert( nameOfShip,  imo,  officialNo,
							 shipownerName,  shipAddress,
							 callsign,  classSociety,
							 hashString);
		*/
	}

	//function GetBuildCert() public view returns (address, string) {
	function GetBuildCert(uint imo) public returns (address) {
		return builderCerts[imo];
	}
	
	function NewProvisionalClassCert(uint imo) public payable {
		ProvisionalClassification cert;
		cert = new ProvisionalClassification();
		provisionalClassCerts[imo] = address(cert);
		/*
		cert.CreateProvisionClassCert ( shipName,  callsign,  imo,  officialNo);
		*/
	}

	function GetProvisionalClassCert(uint imo) public returns (address) {
		return provisionalClassCerts[imo];
	}

	//Valiate owner information, check BuilderCert & ProvisionClassification exists.
	//Check() : "string" => "true"|"ProvisionClassCert" or "BuilderCert"
	function CheckStatus(uint imo) public returns (string){
		address builder = GetBuildCert(imo);
		address class = GetProvisionalClassCert(imo);
		if(builder == address(0)){
			return "BuilderCert";
		}else if (class == address(0)){
			return "ProvisionalClass";
		}else{
			return "true";
		}
	}
}
