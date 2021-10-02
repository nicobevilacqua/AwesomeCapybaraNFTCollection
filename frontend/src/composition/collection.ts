import { ref } from 'vue';
import axios from 'axios';

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
