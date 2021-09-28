import { ethers } from 'hardhat';

const { CONTRACT_ADDRESS } = process.env;

async function main() {
  if (!CONTRACT_ADDRESS) {
    console.error("CONTRACT_ADDRESS doesn't exist");
    process.exit(1);
  }

  const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
  const contract = await Factory.attach(CONTRACT_ADDRESS);
  await contract.deployed();

  console.log('Contract deployed to:', contract.address);

  const tx = await contract.mintNFT();
  const rc = await tx.wait();

  const {
    args: [, tokenId],
  } = rc.events.find(({ event }: { event: string }) => <string>event === 'TokenMinted');

  console.log(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
