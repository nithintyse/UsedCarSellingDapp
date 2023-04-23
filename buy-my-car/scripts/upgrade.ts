import {ethers, upgrades} from "hardhat";

const UPGRADEABLE_PROXY = "0xb55E67dAC915cf9Fde43F47eb3fe81FE8E89a3e2";

async function main() {
    const gas = await ethers.provider.getGasPrice()
    const CarCreateContract = await ethers.getContractFactory("CarCreate");
    console.log("Upgrading CarCreate...");
    let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, CarCreateContract, {
        gasPrice: gas
    });
    console.log("CarCreate Contract Upgraded and Deployed To:", upgrade.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
