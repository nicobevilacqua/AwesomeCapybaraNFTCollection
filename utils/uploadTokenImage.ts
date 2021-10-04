import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const { IPFS_DEPLOY_PINATA__API_KEY, IPFS_DEPLOY_PINATA__SECRET_API_KEY } = process.env;

const pinata = pinataSDK(
  <string>IPFS_DEPLOY_PINATA__API_KEY,
  <string>IPFS_DEPLOY_PINATA__SECRET_API_KEY
);

export async function uploadTokenImage(
  imagePath: string,
  name: string,
  description: string
): Promise<string> {
  const readableStreamForFile = fs.createReadStream(imagePath);
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
  return `https://ipfs.io/ipfs/${IpfsHash}?file=jpeg`;
}
