import {ethers, upgrades} from "hardhat";

async function main() {
  const gas = await ethers.provider.getGasPrice()
  const CarCreateContract = await ethers.getContractFactory("CarCreate");
  console.log("Deploying CarCreate...");
  const carCreateContract = await upgrades.deployProxy(CarCreateContract, [20], {
    gasPrice: gas,
    initializer: "initialValue"
  });
  await carCreateContract.deployed();
  console.log("CarCreate Contract deployed to:", carCreateContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
