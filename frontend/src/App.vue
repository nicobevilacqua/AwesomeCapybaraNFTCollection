<script lang="ts">
  import Alert from '@/components/Alert.vue';
  import Nav from '@/components/Nav.vue';
  import InvalidNetworkMessage from '@/components/InvalidNetworkMessage.vue';
  import NoMetamaskMessage from '@/components/NoMetamaskMessage.vue';
  import AddressNotConnected from '@/components/AddressNotConnected.vue';
  import Footer from '@/components/Footer.vue';
  import Spinner from '@/components/Spinner.vue';
  import TokenPreview from '@/components/TokenPreview.vue';
  import ButtonWithSpinner from '@/components/ButtonWithSpinner.vue';
  import ProgressBar from '@/components/ProgressBar.vue';

  import * as alert from './composition/alert';
  import * as network from './composition/network';
  import * as wallet from './composition/wallet';
  import * as collection from './composition/collection';
  import * as token from './composition/token';
  import * as transaction from './composition/transaction';

  import { defineComponent } from 'vue';

  import detectEthereumProvider from '@metamask/detect-provider';

  const { ethereum } = window as any;

  import { getProvider } from './utils/web3';

  export default defineComponent({
    name: 'App',

    components: {
      Alert,
      Nav,
      ProgressBar,
      TokenPreview,
      InvalidNetworkMessage,
      NoMetamaskMessage,
      Footer,
      Spinner,
      ButtonWithSpinner,
      AddressNotConnected,
    },

    data: () => ({
      metamaskDetected: false,
      loading: false,
    }),

    setup() {
      return { network, wallet, alert, collection, token, transaction };
    },

    computed: {
      appReady() {
        return this.metamaskDetected && network.valid.value;
      },
    },

    async mounted() {
      this.loading = true;
      await this.initApp();
      this.loading = false;
    },

    methods: {
      async initApp() {
        this.metamaskDetected = !!(await detectEthereumProvider());
        if (!this.metamaskDetected) {
          return;
        }

        this.initEvents();

        network.getCurrent();
        if (!network.valid.value) {
          return;
        }

        await wallet.check();
        if (wallet.address.value) {
          await collection.getData();
        }
      },

      initEvents() {
        if (!this.metamaskDetected) {
          return;
        }

        ethereum.on('accountsChanged', ([_address]: [string]) => {
          wallet.address.value = _address;

          if (!_address) {
            return;
          }

          collection.getData();
        });

        const provider = getProvider();
        provider.on('network', (_network) => {
          network.current.value = _network;
          if (!network.valid.value) {
            return;
          }

          wallet.check().then(() => {
            if (wallet.address.value) {
              collection.getData();
            }
          });
        });
      },
    },
  });
</script>

<template>
  <ProgressBar :running="transaction.waiting.value" />
  <Alert />
  <div class="flex flex-col bg-gray-50 justify-stretch h-screen">
    <Nav
      v-if="metamaskDetected"
      v-bind="{
        appReady,
      }"
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
    >
      <h1 class="text-2xl md:text-3xl text-center font-semibold mb-3">
        Awesome Capybara NFT Collection
      </h1>
      <Spinner v-if="loading" class="w-20 my-4" />
      <template v-else>
        <NoMetamaskMessage v-if="!metamaskDetected" />
        <InvalidNetworkMessage v-else-if="!network.valid.value" />
        <AddressNotConnected v-else-if="!wallet.address.value" />

        <template v-else>
          <img
            v-if="!token.token.value"
            src="/hero.jpeg"
            class="w-80 my-5 rounded"
          />
          <h2 v-if="collection.size.value" class="font-semibold mb-6">
            Total collection size: {{ collection.size.value }} items.
          </h2>
          <TokenPreview v-if="token.token.value" :token="token.token.value" />
          <template
            v-else-if="
              collection.available &&
              collection.available.value &&
              collection.available.value > 0
            "
          >
            <p>
              There are still {{ collection.available.value }} items available.
            </p>
            <p class="text-md text-blue-500">
              Claim your own Capybara NFT today!
            </p>
            <ButtonWithSpinner
              class="
                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-700
                focus:border-blue-700
                my-4
                px-10
              "
              :loading="token.claiming.value"
              loadingText="Claiming"
              @click="token.claim"
              text="Claim NFT"
            />
          </template>
          <h3 v-else>All the collection items were claimed! :(</h3>
          <p class="px-5 mt-4 text-center">
            You can see the whole collection on OpenSea
          </p>
          <ButtonWithSpinner
            class="
              bg-green-600
              hover:bg-green-700
              active:bg-green-700
              focus:border-green-700
              my-4
              px-10
            "
            :loading="collection.redirecting.value"
            loadingText="Redirecting"
            @click="collection.redirect"
            text="View Collection"
          />
        </template>
      </template>
    </main>
    <Footer />
  </div>
</template>
