const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")
const ethers = require("ethers")
const ABI = require("../artifacts/contracts/AddresstoEmail.sol/Address_to_Email.json")
require("dotenv").config()

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.SEPOLIA_TESTNET_URL ||
                "https://eth-sepolia.g.alchemy.com/v2/pb7Wd971DGZgE205hdvhcR46Lxm9O5vj",
        )
        console.log("Writing to front end...")
        const address = "0x1459d8F74C827829ce9C0B0E3A1325EdB04b5e90"
        await updateContractAddresses(provider, address)
        await updateAbi(provider, address)
        console.log("Front end written!")
    }
}

async function updateAbi(provider, address) {
    console.log(address)
    const AddresstoEmail = new ethers.Contract(address, ABI.abi, provider)
    console.log(AddresstoEmail)
    fs.writeFileSync(
        frontEndAbiFile,
        AddresstoEmail.interface.format(ethers.utils.FormatTypes.json),
    )
}

async function updateContractAddresses(provider, address) {
    const AddresstoEmail = new ethers.Contract(address, ABI.abi, provider)
    console.log(AddresstoEmail)
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (
            !contractAddresses[network.config.chainId.toString()].includes(AddresstoEmail.address)
        ) {
            contractAddresses[network.config.chainId.toString()].push(AddresstoEmail.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [AddresstoEmail.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
