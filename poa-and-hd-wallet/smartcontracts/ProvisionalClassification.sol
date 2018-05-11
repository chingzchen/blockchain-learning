pragma solidity ^0.4.18;

contract ProvisionalClassification {
    string public ShipName = "";
    string public Callsign = "";
    uint public IMO = 0;
    string public OfficialNumber = "";

    function CreateProvisionClassCert (string shipName, string callsign, uint imo, string officialNo) public payable {
        ShipName = shipName;
        Callsign = callsign;
        IMO = imo;
        OfficialNumber = officialNo;
        ShipInfo.DateOfIssue = now;
    }
    struct ShipInformation {
        uint  DateOfIssue ;
        uint  DateOfExpiry ;
        string  VesselType ;
        string  GrossTonnage;
        string  NetTonnage;
        uint  KeelLaidDate;//String ?
        uint  Length; // 100 * meter
        uint  Depth; // 100 * meter
        uint  Breath ; // 100 * meter
        string  MMSI;
    }
    ShipInformation ShipInfo;

    function GetShipInformation () public returns (uint, uint, string, string, string, uint, uint, uint, uint, string) {
        return (ShipInfo.DateOfIssue, ShipInfo.DateOfExpiry, ShipInfo.VesselType, ShipInfo.GrossTonnage, ShipInfo.NetTonnage, ShipInfo.KeelLaidDate, ShipInfo.Length, ShipInfo.Depth, ShipInfo.Breath, ShipInfo.MMSI);
    }

    function UpdateShipInfo(string shipType, uint length, uint depth, uint breath, string mmsi, string gt, string nt,
                                uint issueDate, uint expiryDate, uint keelLaidDate) public payable {
        ShipInfo.DateOfIssue = issueDate;
        ShipInfo.DateOfExpiry = expiryDate;
        ShipInfo.GrossTonnage = gt;
        ShipInfo.NetTonnage = nt;
        ShipInfo.Length = length;
        ShipInfo.Depth = depth;
        ShipInfo.Breath = breath;
        ShipInfo.MMSI = mmsi;
        ShipInfo.VesselType = shipType;
        ShipInfo.KeelLaidDate = keelLaidDate;
    }


    struct EngineInformation {
        uint NumberOfEngines;
        uint NumberOfShafts;
        uint BHP;
        string EngineMaker;
        string Country;
        string EngineFuelType;
        string YearMade;
        string ModelOfEngine;
        uint SpeedOfShips;
    }
    EngineInformation EngineInfo;
    function UpdateEngineInfo (uint numberOfEngines, uint numberOfShafts, uint bhp,
                            string engineMaker, string country, string engineFuelType,
                            string yearMade, string model, uint speedOfShips) public payable {
        EngineInfo.NumberOfEngines = numberOfEngines;
        EngineInfo.NumberOfShafts = numberOfShafts;
        EngineInfo.BHP = bhp;
        EngineInfo.EngineMaker = engineMaker;
        EngineInfo.Country = country;
        EngineInfo.EngineFuelType = engineFuelType;
        EngineInfo.YearMade = yearMade;
        EngineInfo.ModelOfEngine = model;
        EngineInfo.SpeedOfShips = speedOfShips;
    }
    function GetEngineInfo () returns (uint, uint, uint, string, string, string, string, string, uint) {
        return (EngineInfo.NumberOfEngines, EngineInfo.NumberOfShafts,EngineInfo.BHP,EngineInfo.EngineMaker,EngineInfo.Country,EngineInfo.EngineFuelType,EngineInfo.YearMade,EngineInfo.ModelOfEngine,EngineInfo.SpeedOfShips);
    }
}