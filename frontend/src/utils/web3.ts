import { Contract, ethers } from 'ethers';

const { ethereum } = window as any;

// @ts-ignore
import { address as contractAddress, abi as contractAbi } from '@contract';

export function getProvider() {
  const provider: ethers.providers.Web3Provider =
    new ethers.providers.Web3Provider(ethereum, 'any');
  return provider;
}

export function getContract() {
  const provider = getProvider();
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return contract;
}
