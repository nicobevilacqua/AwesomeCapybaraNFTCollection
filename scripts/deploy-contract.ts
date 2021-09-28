import fs from 'fs';
import path from 'path';
import { ethers, network, run } from 'hardhat';

async function main() {
  const { VERIFY } = process.env;

  console.log('deploying...');

  const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
  const contract = await Factory.deploy();

  await contract.deployed();

  const address = contract.address;

  const [signer] = await ethers.getSigners();

  const contractAbi = require(path.resolve(
    __dirname,
    '../artifacts/contracts/AwesomeCapybaraNFTCollection.sol/AwesomeCapybaraNFTCollection.json'
  ));
  contractAbi.address = address;

  await fs.promises.writeFile(
    path.resolve(path.resolve(__dirname, '../frontend/configs'), `${network.name}.json`),
    JSON.stringify(contractAbi),
    { flag: 'w' }
  );

  if (network.name === 'localhost') {
    const tx = await signer.sendTransaction({
      to: process.env.PUBLIC_KEY,
      value: ethers.utils.parseEther('1.0'),
    });
    await tx.wait();
  }

  console.log('Contract deployed to:', contract.address);

  if (!!VERIFY) {
    console.log('verifing...');

    // wait until the contract is available across the entire net
    await new Promise((resolve) => setTimeout(resolve, 1000 * 30));

    await run('verify:verify', {
      address: contract.address,
      constructorArguments: [],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
