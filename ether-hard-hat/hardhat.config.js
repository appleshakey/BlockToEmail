/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const SEPOLIA_TESTNET_URL = process.env.SEPOLIA_TESTNET_URL
const WALLET_API_KEY = process.env.WALLET_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    solidity: "0.8.19",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_TESTNET_URL,
            accounts: [WALLET_API_KEY],
            saveDeployments: true,
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
    mocha: {
        timeout: 500000,
    },
}
