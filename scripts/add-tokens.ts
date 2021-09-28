import { ethers } from 'hardhat';

import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const { CONTRACT_ADDRESS, IPFS_DEPLOY_PINATA__API_KEY, IPFS_DEPLOY_PINATA__SECRET_API_KEY } =
  process.env;

const pinata = pinataSDK(
  <string>IPFS_DEPLOY_PINATA__API_KEY,
  <string>IPFS_DEPLOY_PINATA__SECRET_API_KEY
);

const TOKEN_NAME_PREFIX = 'Collection Item:';
const TOKEN_DESCRIPTION = 'Awesome Capybara NFT Collection Item';

async function uploadTokenImage(
  imageName: string,
  name: string,
  description: string
): Promise<string> {
  const readableStreamForFile = fs.createReadStream(
    path.resolve(__dirname, '..', 'tokens', imageName)
  );
  const options = {
    pinataMetadata: {
      name,
      keyvalues: {
        description,
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const { IpfsHash } = await pinata.pinFileToIPFS(readableStreamForFile, <any>options);
  return `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
}

async function main() {
  if (!CONTRACT_ADDRESS) {
    console.error("CONTRACT_ADDRESS doesn't exist");
    process.exit(1);
  }

  const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
  const contract = await Factory.attach(CONTRACT_ADDRESS);
  await contract.deployed();

  async function addNewToken(imageName: string) {
    console.log('adding ', imageName);

    const name = imageName.split('.')[0].replace(/_/g, ' ');
    const title = `${TOKEN_NAME_PREFIX} ${name}`;
    const description = TOKEN_DESCRIPTION;

    const image = await uploadTokenImage(imageName, title, description);
    await contract.addItemToCollection(name, description, image);
  }

  console.log('Contract deployed to:', contract.address);

  const images = await fs.promises.readdir(path.resolve(__dirname, '..', 'tokens'));

  let image = images.shift();
  while (image) {
    console.log(image);
    await addNewToken(<string>image);
    image = images.shift();
  }

  console.log('done!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
