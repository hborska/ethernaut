require("dotenv").config();
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-etherscan";

import dotenv from "dotenv";
import glob from "glob";
import path from "path";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
let config: HardhatUserConfig = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 125,
      },
    },
  },

  defaultNetwork: "hardhat",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      timeout: 0,
    },
    goerli: {
      url: process.env.GOERLI_ALCHEMY_URL,
      accounts: [process.env.DEV_SEED || ""],
    },
    hardhat: {},
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  // gasReporter: {
  //   enabled: true,
  //   coinmarketcap: COINMARKETCAP_API_KEY,
  //   currency: 'USD',
  // },

  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  mocha: {
    timeout: 400000,
  },
};

export default config;
