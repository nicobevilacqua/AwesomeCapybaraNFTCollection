import { ref, Ref } from 'vue';
import { showTransactionError } from './alert';

const { ethereum } = window as any;

export const address: Ref<string | null> = ref(null);

export const connecting = ref(false);

async function _connect() {
  try {
    const [_address] = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    address.value = _address;
  } catch (error: any) {
    showTransactionError(error);
  }
}

export async function connect() {
  connecting.value = true;
  await _connect();
  connecting.value = false;
}

async function _check() {
  try {
    const [_address] = await ethereum.request({
      method: 'eth_accounts',
    });

    address.value = _address;
  } catch (error: any) {
    showTransactionError(error);
  }
}

export async function check() {
  connecting.value = true;
  await _check();
  connecting.value = false;
}
