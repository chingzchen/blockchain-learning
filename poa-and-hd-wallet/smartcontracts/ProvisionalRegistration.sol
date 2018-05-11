pragma solidity ^0.4.18;

contract ProvisionalRegistration {
    uint public IMO = 0;
    string public CertificateNo = "";
    string public NameOfShip = "";
    uint public Length = 0;
    uint public Breadth = 0;
    uint public Depth = 0;
    string public Owner = "";
    uint public IssueDate = 0;
    uint public ExpiryDate = 0;

    function ProvisionalRegistration(){

    }

    function GetInfo () public returns (uint, string, string, uint, uint, uint, string, uint, uint) {
        return (IMO, CertificateNo, NameOfShip, Length, Breadth, Depth, Owner, IssueDate, ExpiryDate);
    }

    function NewProvisionalRegistration(uint imo, string certNo, string shipName, uint length, uint breadth,
                                uint depth, string owner, uint issueDate, uint expiryDate) {
        IMO = imo;
        CertificateNo = certNo;
        NameOfShip = shipName;
        Length = length;
        Breadth = breadth;
        Depth = depth;
        Owner = owner;
        IssueDate = issueDate;
        ExpiryDate = expiryDate;
    }    
}