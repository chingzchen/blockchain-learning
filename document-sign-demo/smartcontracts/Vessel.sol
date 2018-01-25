pragma solidity ^0.4.18;

import "./BuilderCert.sol";
import "./ClassCert.sol";
import "./TonnageCert.sol";

contract Vessel {
	mapping (uint32 => address) builderCerts;
	mapping (uint32 => address) classCerts;
	mapping(uint32 => address) tonnageCerts;

	function Vessel () {
	}
	
	function NewBuilderCert(uint32 imo) public payable {
		BuilderCert builderCert;
		builderCert = new BuilderCert();
		builderCerts[imo] = address(builderCert);
		builderCert.UpdateInformation("", imo,
											0,
											"",
											"",
											"",
											"",
											0,
											0,
											"");
	}

	//function GetBuildCert() public view returns (address, string) {
	function GetBuildCert(uint32 imo) public returns (address) {
		return builderCerts[imo];
	}

	function NewClassCert(uint32 imo) public payable {
		ClassCert cert;
		cert = new ClassCert();
		classCerts[imo] = address(cert);
		cert.UpdateInformation("",
								imo,
								"",
								"",
								0,
								0,
								"",
								"");
	}

	function GetClassCert(uint32 imo) public returns (address) {
		return classCerts[imo];
	}

	function NewTonnageCert(uint32 imo) public payable {
		TonnageCert cert;
		cert = new TonnageCert();
		tonnageCerts[imo] = address(cert);

		cert.UpdateInformation("",
								imo,
								0,
								0,
								0,
								"",
								0,
								"",
								"");
	}
	
	function GetTonnageCert(uint32 imo) public returns (address) {
		return tonnageCerts[imo];
	}
}
