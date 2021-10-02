import { ref } from 'vue';
import axios from 'axios';

import { getContract } from '../utils/web3';

// @ts-ignore
import { address as contractAddress } from '@contract';
import * as alert from './alert';

export const url = ref(null);

export const redirecting = ref(false);

async function _redirect() {
  try {
    const { data } = await axios.get(
      `https://rinkeby-api.opensea.io/api/v1/asset_contract/${contractAddress}`
    );
    window.location.href = `https://testnets.opensea.io/collection/${data.collection.slug}`;
  } catch (error) {
    alert.show();
  }
}

export async function redirect() {
  redirecting.value = true;
  await _redirect();
  redirecting.value = false;
}

export const size = ref(null);

export const available = ref(null);

export async function getData() {
  const contract = getContract();
  const [_available, _size] = await Promise.all([
    contract.availableItemsLength(),
    contract.collectionSize(),
  ]);
  size.value = _size;
  available.value = _available;
}
