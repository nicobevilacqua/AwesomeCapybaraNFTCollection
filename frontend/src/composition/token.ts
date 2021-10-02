import { Ref, ref } from 'vue';
import { Token } from '../types/Token';

import { getContract } from '../utils/web3';

import { showTransactionError } from './alert';
import { doTransaction } from './transaction';

// @ts-ignore
import { address as contractAddress } from '@contract';

export const token: Ref<Token | null> = ref(null);

export const claiming = ref(false);

export async function getToken(tokenId: number) {
  const contract = getContract();
  const tokenURI = await contract.tokenURI(tokenId);
  let tokenData = tokenURI.replace('data:application/json;base64,', '');
  tokenData = JSON.parse(atob(tokenData));
  tokenData.openSeaUrl = `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`;
  tokenData.id = tokenId;
  token.value = tokenData;
}

async function _claim() {
  const contract = getContract();
  const receipt = await doTransaction(contract.mintNFT());
  if (receipt) {
    const [_, tokenId] = receipt.events.find(
      (event: any) => event.event === 'TokenMinted'
    ).args;
    await getToken(tokenId);
  }
}

export async function claim() {
  claiming.value = true;
  try {
    await _claim();
  } catch (error: any) {
    showTransactionError(error);
  }
  claiming.value = false;
}
