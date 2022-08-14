// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Election {
    address public admin;
    OrganizerDetails public organizer;
    uint256 candidateCount;
    uint256 numOfBallots;
    mapping(uint256 => Candidate) public candidateDetails;
    mapping(address => Voter) public Voters; // array of eligible voters
    mapping(string => address) public blindedVotes; // array of blinded votes
    mapping (string => bool) public usedSignatures;  // array of used signatures
    mapping (uint256 => Ballot) public Ballots;  // array of used signatures
    ElectionDetails electionDetails;
    bool public start;
    bool public end;

    constructor() {
        // Initilizing default values
        admin = msg.sender;
        //candidateCount = 0;
        //numOfBallots = 0;
    }

    modifier onlyAdmin() {
        // Modifier for only admin access
        require(msg.sender == admin);
        _;
    }

    modifier onlyOrganizer() {
        require(msg.sender == organizer.organizerAddress);
        _;
    }

    struct OrganizerDetails {
        address organizerAddress;
        string signiturePublicKey;
    }

    // Modeling a candidate
    struct Candidate {
        uint256 candidateId;
        string name;
        string slogan;
        uint256 voteCount;
    }

    // Adding new candidates
    function addCandidate(string memory _header, string memory _slogan)
        public
        onlyAdmin
    {
        Candidate memory newCandidate = Candidate({
            candidateId: candidateCount,
            name: _header,
            slogan: _slogan,
            voteCount: 0
        });
        candidateDetails[candidateCount] = newCandidate;
        candidateCount += 1;
    }

    // Modeling a Election Details
    struct ElectionDetails {
        string adminName;
        string adminEmail;
        string electionTitle;
        string organizationTitle;
    }

    function setElectionDetails(
        string memory _adminName,
        string memory _adminEmail,
        string memory _electionTitle,
        string memory _organizationTitle,
        address _organizerAddress,
        string memory _signiturePublicKey
    ) public onlyAdmin {
        electionDetails = ElectionDetails(
            _adminName,
            _adminEmail,
            _electionTitle,
            _organizationTitle
        );
        organizer.organizerAddress = _organizerAddress;
        organizer.signiturePublicKey = _signiturePublicKey;
        start = true;
        end = false;
    }

    // structure that stores voter data
    struct Voter {
        address voterAddress;
        string name;
        string phone;
        string votingPassword;
        bool eligible;
        //bool hasVoted;
        bool isRegistered;
        string blindedVote;
        string signedBlindedVote;
    }

    // Request to be added as voter
    function registerAsVoter(
        string memory _name,
        string memory _phone,
        string memory _votingPassword
    ) public {
        Voter memory newVoter = Voter({
            voterAddress: msg.sender,
            name: _name,
            phone: _phone,
            votingPassword: _votingPassword,
            eligible: false,
            //hasVoted: false,
            isRegistered: true,
            blindedVote: "",
            signedBlindedVote: ""
        });
        Voters[msg.sender] = newVoter;
        //voters.push(msg.sender);
        //voterCount += 1;
    }

    // Verify voter
    function verifyVoter(bool _verifedStatus, address voterAddress)
        public
        onlyOrganizer
    {
        Voters[voterAddress].eligible = _verifedStatus;
    }

    // blinded message is recorded in order to verify whether the Organizer has provided a correct signature on the blinded msg
    function requestBlindSig(string memory blindedVote) public {
        require(Voters[msg.sender].eligible);
        blindedVotes[blindedVote] = msg.sender;
        //emit RequestToBlindlySign(msg.sender);
    }

    // requested blindSig is recorded on the blockchain for auditing purposes
    function writeBlindSig(address _voter, string memory blindSig) onlyOrganizer public {
        Voters[_voter].signedBlindedVote = blindSig;
        Voters[_voter].eligible = false;
    }

    struct Ballot {
        uint256 choiceCode;
        string secretKey;
        string signedVote;
    }
    // if the blind signature hasn't been used yet and is correct, the vote is valid
    function Vote(uint256 _choiceCode, string memory _secretKey, string memory _signedVote) public {
        Ballot memory newBallot = Ballot({
            choiceCode: _choiceCode,
            secretKey: _secretKey,
            signedVote: _signedVote 
        });
        Ballots[numOfBallots] = newBallot;
        //Ballots[choiceCode].secretKey = 
        //require(start == true);
        //require(end == false);
        //require(!usedSignatures[signedVote]);
        //usedSignatures[signedVote] = true;
        //candidateDetails[choiceCode].voteCount += 1;
        //verifyBlindSig(choiceCode, blindedVote, strippedSignedVote);
        //votes[choiceCode] = votes[choiceCode].add(1);
        //emit voteSuccess(msg.sender,choiceCode);
    }

    function validBallots(string memory _signedVote , uint256 _choiceCode) public onlyOrganizer {
        require(!usedSignatures[_signedVote],"This signature has been used");
        require(!end,"Vote is not finished");
        usedSignatures[_signedVote] = true;
        candidateDetails[_choiceCode].voteCount += 1;
    }
    
    // End election
    function endElection() public onlyAdmin {
        end = true;
        start = false;
    }
}