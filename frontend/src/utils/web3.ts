import { Contract, ethers } from 'ethers';

const { ethereum } = window as any;

// @ts-ignore
import { address as contractAddress, abi as contractAbi } from '@contract';

let provider: ethers.providers.Web3Provider;
export function getProvider() {
  if (!provider) {
    provider = new ethers.providers.Web3Provider(ethereum, 'any');
  }
  return provider;
}

let contract: Contract;
export function getContract() {
  if (!contract) {
    const provider = getProvider();
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
  }
  return contract;
}
