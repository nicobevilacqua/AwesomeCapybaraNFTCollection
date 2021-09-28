import { expect } from 'chai';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';

type Item = {
  name: string;
  description: string;
  image: string;
};

type Token = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type MintResponse = {
  owner: string;
  token: Token;
  timestamp: Date;
};

const ITEMS = ['item_1', 'item_2', 'item_3', 'item_4'].reduce((acum: any, item) => {
  acum[item] = {
    name: `${item} name`,
    description: `${item} description`,
    image: `${item} image`,
  };
  return acum;
}, {});

describe('AwesomeCapybaraNFTCollection', () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('AwesomeCapybaraNFTCollection');
    contract = await Factory.deploy();
    await contract.deployed();
  });

  async function testFail(step: Promise<any>) {
    try {
      await step;
    } catch (error) {
      return;
    }
    expect(true).to.equal(false);
  }

  async function mintNFT(user: SignerWithAddress): Promise<MintResponse> {
    const tx = await contract.connect(user).mintNFT();
    const rc = await tx.wait();
    const {
      args: [owner, tokenId, timestamp],
    } = rc.events.find(({ event }: { event: string }) => <string>event === 'TokenMinted');

    const tokenURI = await contract.tokenURI(tokenId);
    const tokenData = JSON.parse(
      Buffer.from(tokenURI.replace('data:application/json;base64,', ''), 'base64').toString()
    );
    const token: Token = {
      ...tokenData,
      id: tokenId,
    };

    return { owner, token, timestamp: new Date(timestamp) };
  }

  async function addItem(item: Item, user = owner) {
    const tx = await contract
      .connect(user)
      .addItemToCollection(item.name, item.description, item.image);
    await tx.wait();
  }

  it('should fail if we try to mint a token without an available image', async () => {
    await testFail(contract.connect(user1).mintNFT());
  });

  it('only owner can add new items', async () => {
    await testFail(addItem(ITEMS.item_1, user1));
  });

  describe('if there is one available item', () => {
    beforeEach(async () => {
      await addItem(ITEMS.item_1);
    });

    it('available items length should be 1', async () => {
      const availableItemsLength = await contract.availableItemsLength();
      expect(availableItemsLength).to.equal(1);
    });

    it('should be minteable', async () => {
      const { owner, token } = await mintNFT(user1);
      expect(owner).to.equal(user1.address);
      expect(token.image).to.equal(ITEMS.item_1.image);
    });

    it('should fail if we try to mint a token without an available image', async () => {
      await mintNFT(user1);
      await testFail(mintNFT(user1));
    });

    it('collection size should be 1', async () => {
      const collectionSize = await contract.collectionSize();
      expect(collectionSize).to.equal(1);
    });

    describe('adding more items', () => {
      beforeEach(async () => {
        await Promise.all([addItem(ITEMS.item_2), addItem(ITEMS.item_3), addItem(ITEMS.item_4)]);
      });

      it('available tokens length should be 4', async () => {
        const availableItemsLength = await contract.availableItemsLength();
        expect(availableItemsLength).to.equal(4);
      });

      describe('and minting all of them', () => {
        let item1: MintResponse;
        let item2: MintResponse;
        let item3: MintResponse;
        let item4: MintResponse;
        beforeEach(async () => {
          [item1, item2, item3, item4] = await Promise.all([
            mintNFT(user1),
            mintNFT(user1),
            mintNFT(user2),
            mintNFT(user2),
          ]);
        });

        it('should be able to mint those new tokens', async () => {
          expect(item1.owner).to.equal(user1.address);
          expect(item2.owner).to.equal(user1.address);
          expect(item3.owner).to.equal(user2.address);
          expect(item4.owner).to.equal(user2.address);
        });

        it('the availableItemsLength should be 0', async () => {
          const availableItemsLength = await contract.availableItemsLength();
          expect(availableItemsLength).to.equal(0);
        });

        it('the collection size should be 4', async () => {
          const collectionSize = await contract.collectionSize();
          expect(collectionSize).to.equal(4);
        });

        it('should fail if we try to mint a token without an available image', async () => {
          await testFail(mintNFT(user1));
        });
      });
    });
  });
});
