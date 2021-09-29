import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const { CONTRACT_ADDRESS, IPFS_DEPLOY_PINATA__API_KEY, IPFS_DEPLOY_PINATA__SECRET_API_KEY } =
  process.env;

const pinata = pinataSDK(
  <string>IPFS_DEPLOY_PINATA__API_KEY,
  <string>IPFS_DEPLOY_PINATA__SECRET_API_KEY
);

export async function uploadTokenImage(
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
