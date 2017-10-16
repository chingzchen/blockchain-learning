pragma solidity ^0.4.2;

contract ChickenFarmContract5 {
    address public EventOwner;
    string public State;
    mapping (string => uint) logs;
    event Print(string);

    //Management information
    string public batchId = "";
    string public farmId = "";


    //Telemetry from IoT devices, as Solidity doesn't support decimal data types, these have to presents in integers
    uint public timestamp = 0;  //current time;
    mapping (string => uint) temperature; //actual temperature * 100
    mapping (string => uint) humidity;   //actual humidity * 100
    uint public n2;     //actual * 100
    uint public co2 = 0;    //actual * 100
    uint public pm25 = 0;   //actual * 100
    uint public lightIntensity = 0; //actual * 100
    uint public nagitivePressure = 0;   //actual * 100
    uint public averageWeight = 0;  //actual * 100
    uint public o2 = 0; //actual * 100
    uint public waterVolume = 0; //actual * 100

    //Information requires daily or periodically manually inputs.
    uint public deathRate = 0;  //actual * 100
    mapping (string => uint) medicine;   //actual * 100; medicine name :: volume
    uint public dailyFeedVolume;  //actual * 100; feed volume
    uint public chickenInTimestamp = 0;
    uint public chickenOutTimestamp = 0;
    uint public initialChicken = 0;

    //Information requires manually inputs or come from IoT devices.
    uint public feedPrice = 0;//actual * 100
    uint public chickenPrice = 0;//actual * 100
    mapping(string => uint) medicinePrice;//actual * 100
    uint public powerPrice = 0;//actual * 100
    uint public coalPrice = 0;//actual * 100
    uint public waterPrice = 0;//actual * 100

    function ChickenFarmContract5(string _batchId, string _farmId) {
        EventOwner = msg.sender;
        batchId = _batchId;
        farmId = _farmId;
    }

    function stringsEqual(string memory _a, string memory _b) internal returns (bool) {
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
    function IngestTelemetry (bytes32[] _tempDevices, uint[] _temperatures, bytes32[] _humidityDevices, uint[] _humidity,
                            uint _n2, uint _co2, uint _pm25, uint _light, uint _nativePressure, uint _weight, uint _o2, uint _water) returns (bool)
    {

        if(_n2 != 0)
            n2 = _n2;
        if(_co2 != 0)
            co2 = _co2;
        if(_pm25 != 0)
            pm25 = _pm25;
        if(_light != 0)
            lightIntensity = _light;
        if(_nativePressure != 0)
            nagitivePressure = _nativePressure;
        if(_weight != 0)
            averageWeight = _weight;
        if(_o2 != 0)
            o2 = _o2;
        if(_water != 0)
            waterVolume = _water;

        timestamp = now;

        UpdateTelemetry4(_tempDevices, _temperatures, _humidityDevices, _humidity);

        return true;
    }

    function UpdateTelemetry4(bytes32[] _tempDevices, uint[] _temperatures, bytes32[] _humidityDevices, uint[] _humidity) {
        for (uint j = 0; j < _humidityDevices.length; j++) {
            string memory hum = bytes32ArrayToString(_humidityDevices[i]);
            humidity[hum] = _humidity[i];
        }

        for (uint i = 0; i < _tempDevices.length; i++) {
            string memory temp = bytes32ArrayToString(_tempDevices[i]);
            temperature[temp] = _temperatures[i];
        }
    }

    function bytes32ArrayToString (bytes32 data) returns (string) {
        bytes memory bytesString = new bytes(data.length * 32);
        uint urlLength;
        for (uint i=0; i < data.length; i++) {
            for (uint j=0; j < 32; j++) {
                byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[urlLength] = char;
                    urlLength += 1;
                }
            }
        }
        bytes memory bytesStringTrimmed = new bytes(urlLength);
        for (i=0; i<urlLength; i++) {
            bytesStringTrimmed[i] = bytesString[i];
        }
        return string(bytesStringTrimmed);
    }

    function UpdateContract (string _newState, uint _timestamp) returns (bool) {
        if(EventOwner != msg.sender) {
            logs["OwnerChanged"] = _timestamp;
            EventOwner = msg.sender;
            Print("Owner Updated");
        }

        //Solodity has 3 data locations
        //http://me.tryblockchain.org/solidity-data-location.html
        //Storage - will write to blockchain
        //memory - function Parameters
        //calldata  - smart contract method parameters
        string memory tmp = State;
        if (!stringsEqual(tmp, _newState)) {
            State = _newState;
            logs["StateChanged"] = timestamp;
            Print(State);
        }
        return true;
/*
    //Information requires daily or periodically manually inputs.
    uint public deathRate = 0;  //actual * 100
    mapping (string => uint) medicine;   //actual * 100; medicine name :: volume
    uint public dailyFeedVolume;  //actual * 100; feed volume
    uint public chickenInTimestamp = 0;
    uint public chickenOutTimestamp = 0;
    uint public initialChicken = 0;

    //Information requires manually inputs or come from IoT devices.
    uint public feedPrice = 0;//actual * 100
    uint public chickenPrice = 0;//actual * 100
    mapping(string => uint) medicinePrice;//actual * 100
    uint public powerPrice = 0;//actual * 100
    uint public coalPrice = 0;//actual * 100
    uint public waterPrice = 0;//actual * 100
*/
    }
}