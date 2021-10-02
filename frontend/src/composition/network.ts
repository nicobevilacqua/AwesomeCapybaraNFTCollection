import { ref, Ref, computed } from 'vue';
import { ethers } from 'ethers';

import { NETWORKS } from '../constants';

import { showTransactionError } from '../composition/alert';

// @ts-ignore
const isProd = !!import.meta.env.PROD;

const { ethereum } = window as any;

export const expected = isProd ? NETWORKS.RINKEBY : NETWORKS.LOCALHOST;

export const current: Ref<ethers.providers.Network | null> = ref(null);

export const switching = ref(false);

async function _switchToValid() {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: expected.params.chainId,
        },
      ],
    });
  } catch (error: any) {
    // Missing network
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [expected.params],
        });
      } catch (error: any) {
        showTransactionError(error);
      }
    }
    showTransactionError(error);
  }
}

export async function switchToValid() {
  switching.value = true;
  await _switchToValid();
  switching.value = false;
}

export function getCurrent() {
  current.value = ethers.providers.getNetwork(
    parseInt(ethereum.networkVersion, 10)
  );
}

export const valid = computed(() => {
  if (!current.value) {
    return false;
  }

  if (Array.isArray(expected.chainId)) {
    return expected.chainId.includes(current.value.chainId);
  }

  return expected.chainId === current.value.chainId;
});
