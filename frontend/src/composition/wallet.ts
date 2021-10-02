import { ref, Ref } from 'vue';

const { ethereum } = window as any;

export const address: Ref<string | null> = ref(null);

export async function connect() {
  const [_address] = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  address.value = _address;
}

export async function check() {
  const [_address] = await ethereum.request({
    method: 'eth_accounts',
  });

  address.value = _address;
}
