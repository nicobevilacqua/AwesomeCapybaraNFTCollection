import { config } from 'dotenv';
config();

import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-watcher';
import { task } from 'hardhat/config';
import path from 'path';
import fs from 'fs';

import { uploadTokenImage } from './utils/uploadTokenImage';

const TOKEN_NAME_PREFIX = 'Collection Item:';
const TOKEN_DESCRIPTION = 'Awesome Capybara NFT Collection Item';

task('deploy', 'deploy the smart contract on localhost for development')
  .addOptionalParam('owner', 'the contract deployer address')
  .setAction(async ({ owner }, { ethers }) => {
    const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
    const contract = await Factory.deploy();
    await contract.deployed();

    const { address } = contract;
    console.log('Contract deployed to:', address);
    return address;
  });

task('update-frontend', 'update frontend contract information')
  .addParam('address', 'the contract address')
  .setAction(async ({ address }, { network }) => {
    const contractAbi = require(path.resolve(
      __dirname,
      './artifacts/contracts/AwesomeCapybaraNFTCollection.sol/AwesomeCapybaraNFTCollection.json'
    ));
    contractAbi.address = address;

    await fs.promises.writeFile(
      path.resolve(path.resolve(__dirname, './frontend/configs'), `${network.name}.json`),
      JSON.stringify(contractAbi),
      { flag: 'w' }
    );
  });

task('add', 'add item to colection')
  .addParam('address', 'the contract address')
  .addParam('name', 'the item name')
  .addParam('description', 'the item description')
  .addParam('image', 'the item image')
  .setAction(async ({ address, name, description, image }, { ethers, network }) => {
    console.log('adding item (', name, description, image, ') to:', address);

    console.log('connecting to', address);

    const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
    const contract = await Factory.attach(address);
    await contract.deployed();

    const imagePinataUrl = await uploadTokenImage(image, name, TOKEN_DESCRIPTION);

    const tx = await contract.addItemToCollection(name, description, imagePinataUrl);
    const rc = await tx.wait();
  });

task('populate', 'add items to collection')
  .addParam('address', 'the contract address')
  .setAction(async ({ address }, { run }) => {
    const images = await fs.promises.readdir(path.resolve(__dirname, 'tokens'));

    const tokens = images.map((image) => {
      const name = image.split('.')[0].replace(/_/g, ' ');

      return {
        name,
        description: name,
        image,
      };
    });

    let token = tokens.shift();
    while (token) {
      await run('add', { address, ...token });
      token = tokens.shift();
    }
    console.log('done');
  });

task('mint', 'mint a random token from contract')
  .addParam('address', 'the contract address')
  .addParam('user', 'the user address')
  .setAction(async ({ address, user }, { ethers }) => {
    const signers = await ethers.getSigners();
    const signer = signers.find(({ address }) => address === user);
    if (!signer) {
      throw new Error(`user address ${user} is not a valid signer`);
    }

    console.log('connecting to', address);

    const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
    const contract = await Factory.attach(address);
    await contract.deployed();

    const tx = await contract.mintNFT();
    const rc = await tx.wait();

    const {
      args: [, tokenId],
    } = rc.events.find(({ event }: { event: string }) => <string>event === 'TokenMinted');
    const tokenURI = `https://testnets.opensea.io/assets/${address}/${tokenId.toNumber()}`;
    console.log(tokenURI);

    return tokenURI;
  });

task('prod', 'deploy contract to prod')
  .addOptionalParam('verify', 'verify the contract')
  .setAction(async ({ verify }, { ethers, network, run }) => {
    const address = await run('deploy');

    if (!!verify) {
      if (['hardhat', 'localhost'].includes(network.name)) {
        throw new Error('contract can be verified only on real chains');
      }

      console.log('waiting...');

      // wait until the contract is available across the entire net
      await new Promise((resolve) => setTimeout(resolve, 1000 * 30));

      console.log('verifing...');

      await run('verify:verify', {
        address,
        constructorArguments: [],
      });

      console.log('contract verified');
    }

    await run('populate', { address });
    await run('update-frontend', { address });
  });

task('addEther', 'add ether to an account locally')
  .addOptionalParam('to', 'the receiver address')
  .setAction(async ({}, { ethers, network, run }) => {
    if (network.name !== 'localhost') {
      throw new Error('this task should be run on localhost');
    }
    const [signer] = await ethers.getSigners();
    const tx = await signer.sendTransaction({
      to: process.env.PUBLIC_KEY,
      value: ethers.utils.parseEther('1.0'),
    });
    await tx.wait();
  });

task('dev', 'set a dev contract on the hardhat node').setAction(
  async ({}, { ethers, network, run }) => {
    if (network.name !== 'localhost') {
      throw new Error('this task should be run on localhost');
    }

    const address = await run('deploy');

    const [owner] = await ethers.getSigners();

    await run('populate', { address });
    await run('mint', { address, user: owner.address });
    await run('update-frontend', { address });
    await run('addEther');
  }
);

export default {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: !!process.env.OPTIMIZER_ENABLED,
        runs: 1000,
      },
    },
  },

  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },

    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    gasPrice: 21,
    coinmarketcap: process.env.CMC_KEY,
    currency: 'USD',
    outputFile: process.env.TO_FILE ? path.resolve(__dirname, 'gasReporterOutput.json') : undefined,
  },

  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },

    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
