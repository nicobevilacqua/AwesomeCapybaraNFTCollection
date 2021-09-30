<script lang="ts">
  import Alert from '@components/Alert.vue';
  import Nav from '@components/Nav.vue';
  import Footer from '@components/Footer.vue';
  import ProgressBar from '@/components/ProgressBar.vue';

  import { defineComponent } from 'vue';

  import { Contract, ethers } from 'ethers';
  import detectEthereumProvider from '@metamask/detect-provider';

  import {
    NETWORKS,
    TRANSACTION_ERROR_CODES,
    ERRORS,
    ALERT_TYPES,
    MESSAGES,
  } from './constants';

  const isProd = !!import.meta.env.PROD;

  // @ts-ignore
  import { address as contractAddress, abi as contractAbi } from '@contract';

  const { ethereum } = window as any;

  let provider: ethers.providers.Web3Provider;
  function getProvider() {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(ethereum, 'any');
    }
    return provider;
  }

  let contract: Contract;
  function getContract() {
    if (!contract) {
      const provider = getProvider();
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractAbi, signer);
    }
    return contract;
  }

  type TransactionError = {
    code: number;
    error: {
      message: string;
    };
    data: {
      message: string;
    };
  };

  type Token = {
    id: number;
    name: string;
    description: string;
    image: string;
    openSeaUrl: string;
  };

  function getTransactionErrorMessage(response: TransactionError) {
    const { code, error, data } = response;
    if (code === TRANSACTION_ERROR_CODES.REJECTED_BY_USER) {
      return ERRORS.TRANSACTION_REJECTED_BY_USER;
    }

    if (code === TRANSACTION_ERROR_CODES.PENDING) {
      return ERRORS.TRANSACTION_WAITING_FOR_APPOVAL;
    }

    if (error) {
      return error.message;
    }

    if (data) {
      return data.message;
    }

    console.error(response);
    return ERRORS.TRANSACTION_FAILED;
  }

  export default defineComponent({
    name: 'App',

    components: {
      Alert,
      Nav,
      ProgressBar,
      Footer,
    },

    provide() {
      return {
        connectWallet: this.connectWallet,
      };
    },

    data: () => ({
      metamaskDetected: false,
      network: undefined as ethers.providers.Network | undefined,
      expectedNetwork: isProd ? NETWORKS.RINKEBY : NETWORKS.LOCALHOST,

      collectionSize: null as null | number,
      availableItemsLength: null as null | number,

      address: null as null | string,

      transactionRunning: null as null | string,

      claiming: false,

      token: null as Token | null,
    }),

    computed: {
      collectionUrl() {
        return `https://testnets.opensea.io/collection/${contractAddress}`;
      },

      validNetwork() {
        if (!this.network) {
          return false;
        }

        if (Array.isArray(this.expectedNetwork.chainId)) {
          return this.expectedNetwork.chainId.includes(this.network.chainId);
        }

        return this.expectedNetwork.chainId === this.network.chainId;
      },

      appReady() {
        return this.metamaskDetected && this.validNetwork;
      },
    },

    async mounted() {
      this.metamaskDetected = !!(await detectEthereumProvider());
      if (!this.metamaskDetected) {
        this.showAlert(ERRORS.MISSING_METAMASK);
        return;
      }

      this.network = ethers.providers.getNetwork(
        parseInt(ethereum.networkVersion, 10)
      );

      this.initEvents();

      if (!this.validNetwork) {
        return;
      }

      await this.checkIfWalletIsConnected();
      await this.initializeData();
    },

    methods: {
      async initializeData() {
        if (!this.address) {
          return;
        }

        await this.getCollectionData();
      },

      showAlert(...args: any) {
        if (!this.$refs.alert) {
          return;
        }
        (this.$refs.alert as any).showAlert(...args);
      },

      hideAlert() {
        (this.$refs.alert as any).hideAlert();
      },

      async checkIfWalletIsConnected() {
        if (!this.appReady) {
          return;
        }

        const [address] = await ethereum.request({
          method: 'eth_accounts',
        });

        this.address = address;
      },

      async switchToValidChain() {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: this.expectedNetwork.params.chainId,
              },
            ],
          });
        } catch (error: any) {
          // Missing network
          if (error.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [this.expectedNetwork.params],
              });
            } catch (error: any) {
              const errorMessage = getTransactionErrorMessage(error);
              this.showAlert(errorMessage, ALERT_TYPES.ERROR);
            }
          }
          const errorMessage = getTransactionErrorMessage(error);
          this.showAlert(errorMessage, ALERT_TYPES.ERROR);
        }
      },

      async getCollectionData() {
        const contract = getContract();
        const [availableItemsLength, collectionSize] = await Promise.all([
          contract.availableItemsLength(),
          contract.collectionSize(),
        ]);
        this.availableItemsLength = parseInt(availableItemsLength, 10);
        this.collectionSize = parseInt(collectionSize, 10);
      },

      async doTransaction(transactionPromise: Promise<any>) {
        if (this.transactionRunning) {
          return;
        }

        this.hideAlert();

        try {
          const tx = await transactionPromise;

          this.transactionRunning = tx.hash;

          const receipt = await tx.wait();

          if (receipt.status === 0) {
            this.showAlert(ERRORS.TRANSACTION_FAILED, ALERT_TYPES.ERROR);
          } else {
            this.showAlert(MESSAGES.TRANSACTION_COMPLETED, ALERT_TYPES.SUCCESS);
          }
          return receipt;
        } catch (response: any) {
          const errorMessage = getTransactionErrorMessage(response);
          this.showAlert(errorMessage, ALERT_TYPES.ERROR);
        } finally {
          this.transactionRunning = null;
        }
      },

      async connectWallet() {
        if (!this.appReady) {
          return;
        }

        const [address] = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        this.address = address;

        this.initializeData();
      },

      async getTokenData(tokenId: number) {
        const token = await contract.tokenURI(tokenId);
        let tokenData = token.replace('data:application/json;base64,', '');
        tokenData = JSON.parse(atob(tokenData));
        tokenData.openSeaUrl = `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`;
        tokenData.id = tokenId;
        this.token = tokenData;
      },

      async claim() {
        this.claiming = true;
        const contract = getContract();
        const transactionPromise = contract.mintNFT();
        const receipt = await this.doTransaction(transactionPromise);
        if (receipt) {
          const [_, tokenId] = receipt.events.find(
            (event: any) => event.event === 'TokenMinted'
          ).args;
          await this.getTokenData(tokenId);
        }
        this.claiming = false;
      },

      initEvents() {
        if (!this.metamaskDetected) {
          return;
        }

        ethereum.on('accountsChanged', ([newAddress]: [string]) => {
          this.address = newAddress;
          if (!newAddress) {
            return;
          }

          this.initializeData();
        });

        const provider = getProvider();
        provider.on('network', (newNetwork) => {
          this.network = newNetwork;
          if (!this.validNetwork) {
            this.showAlert(`You should change to Rinkeby`);
            return;
          }

          this.initializeData();
        });
      },
    },
  });
</script>

<template>
  <ProgressBar :running="!!transactionRunning" />
  <Alert ref="alert" />
  <div class="flex flex-col bg-gray-50 justify-stretch h-screen">
    <Nav
      v-bind="{ network, address, appReady, validNetwork, expectedNetwork }"
      @switch-chain="switchToValidChain"
    />
    <main
      class="
        w-full
        flex flex-col
        py-6
        px-3
        md:px-0 md:py-12
        flex-grow
        items-center
        text-gray-600
        flex-grow
      "
      style="z-index: 9"
    >
      <h1 class="text-2xl md:text-3xl text-center font-semibold mb-3">
        Awesome Capybara NFT Collection
      </h1>
      <h2 class="font-semibold mb-6">
        Total collection size: {{ collectionSize }} items.
      </h2>
      <div
        v-if="token"
        class="max-w-sm rounded-xl border px-4 py-6 md:p-10 shadow bg-white"
      >
        <div class="text-center pb-5 uppercase font-semibold">
          {{ token.name }}
        </div>
        <img class="w-full rounded" :src="token.image" />
        <div class="pt-5 pb-1 font-semibold">Description:</div>
        <div class="pb-5 pt-1">{{ token.description }}</div>
        <a :href="token.openSeaUrl" class="text-blue-400 underline"
          >See at OpenSea</a
        >
      </div>
      <template v-else-if="availableItemsLength && availableItemsLength > 0">
        <p>There are still {{ availableItemsLength }} items available.</p>
        <p class="text-md text-blue-500">Claim your own Capybara NFT today!</p>
        <button
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            py-2
            px-10
            my-4
            w-full
            md:w-auto
            text-center
            border border-transparent
            text-base
            leading-6
            font-medium
            rounded-md
            text-white
            bg-blue-600
            hover:shadow-md hover:bg-blue-700
            active:bg-blue-700
            focus:border-blue-700
            transition
            ease-in-out
            duration-150
          "
          :class="{ 'cursor-not-allowed': claiming }"
          :disabled="claiming"
          @click="claim"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            v-if="claiming"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ claiming ? 'Claiming...' : 'Claim NFT' }}
        </button>
      </template>
      <h3 v-else>All the collection items were claimed! :(</h3>
      <p class="pt-5">You can see the whole collection at OpenSea</p>
      <a
        class="
          bg-green-500
          hover:bg-green-600
          px-10
          py-2
          my-4
          rounded
          shadow
          hover:shadow-md
          font-semibold
          w-full
          focus:border-green-700
          transition
          ease-in-out
          duration-150
          md:w-auto
          justify-center
          inline-flex
          ml-1
          text-base
          leading-6
          font-medium
          rounded-md
          text-white
          leading-6
          shadow-inner
        "
        :href="collectionUrl"
      >
        View Collection
      </a>
    </main>
    <Footer />
  </div>
</template>
